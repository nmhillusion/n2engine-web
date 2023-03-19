import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";

export class CopyResourceRenderer extends Renderable {
  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    let extsToCopy = [".jpg", ".jpeg", ".png", ".gif", ".ico", ".woff", ".ttf"];
    if (Array.isArray(renderConfig.copyResource?.config?.extsToCopy)) {
      extsToCopy = renderConfig.copyResource?.config?.extsToCopy;
    }
    if (extsToCopy.some((ext) => filePath.endsWith(ext))) {
      this.logger.info("copy resource for ", filePath);
      FileSystemHelper.copyFile({
        sourceFilePath: filePath,
        rootDir,
        outDir,
      });
    }
  }
}
