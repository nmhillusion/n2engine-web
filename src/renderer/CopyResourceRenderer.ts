import { FileSystemHelper } from "../helper/FileSystemHelper";
import { RenderConfig } from "../model";
import { Renderable } from "./Renderable";

export class CopyResourceRenderer extends Renderable {

  protected doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (
      (
        renderConfig.copyResource.extsToCopy || [
          ".jpg",
          ".jpeg",
          ".png",
          ".gif",
          ".ico",
          ".woff",
          ".ttf",
        ]
      ).some((ext) => filePath.endsWith(ext))
    ) {
      this.logger.info("copy resource for ", filePath);
      FileSystemHelper.copyFile({
        sourceFilePath: filePath,
        rootDir,
        outDir,
      });
    }
  }
}
