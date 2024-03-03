import * as fs from "fs";
import * as shelljs from "shelljs";
import { CompilerOptions } from "typescript";

import { Renderable } from "../Renderable";
import { BullEngineState, WORKSPACE_DIR } from "../../index";
import { RenderConfig } from "../../model";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";

export class TypeScriptRenderer extends Renderable {
  private readonly userTsConfigPath: string =
    WORKSPACE_DIR + "/user.tsconfig.json";
  private readonly userBaseTsConfigPath: string =
    WORKSPACE_DIR + "/user.base.tsconfig.json";

  private ableToExecution = true;

  constructor(traversal: TraversalWorkspace, engineState: BullEngineState) {
    super(traversal, engineState);
    const npxWhich = shelljs.which("npx");
    if (!npxWhich || 0 == String(npxWhich).trim().length) {
      this.logger.error(
        "Required to install command `npx` to use Typescript renderer."
      );

      this.ableToExecution = false;
    }
  }

  private readUserTsConfigFile() {
    return fs.readFileSync(this.userBaseTsConfigPath).toString();
  }

  private writeUserTsConfigFile(data: string) {
    fs.writeFileSync(this.userTsConfigPath, data);
  }

  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (
      this.ableToExecution &&
      filePath.endsWith(".ts") &&
      // not compile declaration file of typescript
      !filePath.endsWith(".d.ts")
    ) {
      this.logger.info(filePath);
      const tsConfig: {
        files: string[];
        compilerOptions: CompilerOptions;
      } = JSON.parse(this.readUserTsConfigFile());

      if (renderConfig?.typescript?.config) {
        const userTsConfig = renderConfig?.typescript?.config;

        if (renderConfig?.typescript?.overwriteAllConfig) {
          tsConfig.compilerOptions = renderConfig?.typescript?.config;
        } else {
          for (const configKey of Object.keys(userTsConfig)) {
            tsConfig.compilerOptions[configKey] = userTsConfig[configKey];
          }
        }
      }

      tsConfig.files = [filePath];
      tsConfig.compilerOptions.rootDir = rootDir;
      tsConfig.compilerOptions.outDir = outDir;

      this.writeUserTsConfigFile(JSON.stringify(tsConfig));

      const { code, stderr, stdout } = shelljs.exec(
        `npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json`,
        {
          async: false,
        }
      );

      this.logger.debug({ code, stderr, stdout });
    }
  }
}
