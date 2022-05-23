import * as fs from "fs";
import * as shelljs from "shelljs";

import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";

export class TypeScriptRenderer extends Renderable {
  private readonly userTsConfigPath: string =
    __dirname + "/../../user.tsconfig.json";

  constructor(traversaler: TraversalWorkspace) {
    super(traversaler);
  }

  private readUserTsConfigFile() {
    return fs.readFileSync(this.userTsConfigPath).toString();
  }

  private writeUserTsConfigFile(data: string) {
    fs.writeFileSync(this.userTsConfigPath, data);
  }

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".ts")) {
      console.log("typescript will render for file: ", filePath);
      const tsConfig = JSON.parse(this.readUserTsConfigFile());
      tsConfig.files = [filePath];
      this.writeUserTsConfigFile(JSON.stringify(tsConfig));

      shelljs.exec("npm run tsc-user");
    }
  }
}
