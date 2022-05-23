import * as shelljs from "shelljs";
import * as typescript from "typescript";

import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";

export class TypeScriptRenderer extends Renderable {
  constructor(traversaler: TraversalWorkspace) {
    super(traversaler);
  }

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".ts")) {
      console.log("typescript will render for file: ", filePath);

      
    }
  }
}
