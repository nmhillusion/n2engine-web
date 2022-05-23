import * as sass from "node-sass";
import { FileSystemHelper } from "./FileSystemHelper";
import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";

export class ScssRenderer extends Renderable {
  constructor(traversaler: TraversalWorkspace) {
    super(traversaler);
  }

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".scss")) {
      const { css } = sass.renderSync({
        file: filePath,
      });

      let rendered = css.toString();

      FileSystemHelper.writeOutFile({
        data: rendered,
        outDir,
        rootDir,
        sourceFilePath: filePath,
        outExtension: ".css",
      });
    }
  }
}
