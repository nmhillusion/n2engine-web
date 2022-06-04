import * as sass from "node-sass";
import { FileSystemHelper } from "../helper/FileSystemHelper";
import { Renderable } from "./Renderable";

export class ScssRenderer extends Renderable {
  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".scss")) {
      console.log("[scss] render: ", filePath);

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
