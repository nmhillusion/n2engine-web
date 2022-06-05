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
      console.log("[typescript] render: ", filePath);
      const tsConfig = JSON.parse(this.readUserTsConfigFile());
      tsConfig.files = [filePath];
      tsConfig.compilerOptions.rootDir = rootDir;
      tsConfig.compilerOptions.outDir = outDir;

      if (renderConfig?.typescript?.config) {
        Object.assign(tsConfig, renderConfig?.typescript?.config);
      }

      this.writeUserTsConfigFile(JSON.stringify(tsConfig));

      shelljs.exec(`npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json`);
    }
  }
}
