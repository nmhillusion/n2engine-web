import * as fs from "fs";
import * as shelljs from "shelljs";

import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";

export class TypeScriptRenderer extends Renderable {
  private readonly userTsConfigName: string = "user.tsconfig.json";
  private readonly userBaseTsConfigPath: string =
    __dirname + "/../../user.base.tsconfig.json";

  constructor(traversaler: TraversalWorkspace) {
    super(traversaler);
  }

  private readUserTsConfigFile() {
    return fs.readFileSync(this.userBaseTsConfigPath).toString();
  }

  private writeUserTsConfigFile(baseDir: string, data: string) {
    fs.writeFileSync(baseDir + "/" + this.userTsConfigName, data);
  }

  protected doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    baseDir: string
  ) {
    if (filePath.endsWith(".ts")) {
      console.log("typescript will render for file: ", filePath);
      const tsConfig = JSON.parse(this.readUserTsConfigFile());
      tsConfig.files = [filePath];
      tsConfig.compilerOptions.rootDir = rootDir;
      tsConfig.compilerOptions.outDir = outDir;
      this.writeUserTsConfigFile(baseDir, JSON.stringify(tsConfig));

      shelljs.exec(`tsc --project ${baseDir}/user.tsconfig.json`);
    }
  }
}
