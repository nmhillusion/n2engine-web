import * as pug from "pug";
import { FileSystemHelper } from "./FileSystemHelper";
import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";

export class PugRenderer extends Renderable {
  constructor(traversaler: TraversalWorkspace) {
    super(traversaler);
  }

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".pug")) {
      const rendered = pug.renderFile(filePath, {
        pretty: true,
      });

      FileSystemHelper.writeOutFile({
        data: rendered,
        outDir,
        rootDir,
        sourceFilePath: filePath,
        outExtension: ".html",
      });
    }
  }
}
