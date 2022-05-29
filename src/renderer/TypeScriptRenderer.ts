import * as fs from "fs";
import * as shelljs from "shelljs";

import { Renderable } from "./Renderable";
import { WORKSPACE_DIR } from "../index";

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

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".ts")) {
      console.log("[typescript] render: ", filePath);
      const tsConfig = JSON.parse(this.readUserTsConfigFile());
      tsConfig.files = [filePath];
      tsConfig.compilerOptions.rootDir = rootDir;
      tsConfig.compilerOptions.outDir = outDir;
      this.writeUserTsConfigFile(JSON.stringify(tsConfig));

      shelljs.exec(
        `${WORKSPACE_DIR}/node_modules/.bin/tsc --project ${WORKSPACE_DIR}/user.tsconfig.json`
      );
    }
  }
}
