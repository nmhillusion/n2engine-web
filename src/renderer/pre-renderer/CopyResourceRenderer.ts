import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";

export class CopyResourceRenderer extends Renderable {
  constructor(
    traversal: TraversalWorkspace,
    engineState: BullEngineState,
    renderConfig: RenderConfig
  ) {
    super(traversal, engineState, renderConfig);
  }

  protected async doRender(filePath: string, rootDir: string, outDir: string) {
    const renderConfig = this.renderConfig;

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
