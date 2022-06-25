import * as fs from "fs";
import * as shelljs from "shelljs";

import { Renderable } from "./Renderable";
import { WORKSPACE_DIR } from "../index";
import { RenderConfig } from "../model";

export class TypeScriptRenderer extends Renderable {
  private readonly userTsConfigPath: string =
    WORKSPACE_DIR + "/user.tsconfig.json";
  private readonly userBaseTsConfigPath: string =
    WORKSPACE_DIR + "/user.base.tsconfig.json";

  private readUserTsConfigFile() {
    return fs.readFileSync(this.userBaseTsConfigPath).toString();
  }

  private writeUserTsConfigFile(data: string) {
    fs.writeFileSync(this.userTsConfigPath, data);
  }

  protected doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (filePath.endsWith(".ts")) {
      this.logger.info(filePath);
      const tsConfig = JSON.parse(this.readUserTsConfigFile());

      if (renderConfig?.typescript?.config) {
        const userTsConfig = renderConfig?.typescript?.config;
        for (const configKey of Object.keys(userTsConfig)) {
          if (!(configKey in tsConfig)) {
            tsConfig[configKey] = {};
          }
          Object.assign(tsConfig[configKey], userTsConfig[configKey]);
        }
      }

      tsConfig.files = [filePath];
      tsConfig.compilerOptions.rootDir = rootDir;
      tsConfig.compilerOptions.outDir = outDir;

      this.writeUserTsConfigFile(JSON.stringify(tsConfig));

      shelljs.exec(`npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json`);
    }
  }
}
