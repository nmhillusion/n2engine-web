import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";

export class CopyResourceRenderer extends Renderable {
  private extsToCopy: string[] = [];

  constructor(
    traversal: TraversalWorkspace,
    engineState: BullEngineState,
    renderConfig: RenderConfig
  ) {
    super(traversal, engineState, renderConfig);
  }

  protected setupSelfConfig(): void {
    this.extsToCopy = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".ico",
      ".woff",
      ".ttf",
    ];
    if (Array.isArray(this.renderConfig.copyResource?.config?.extsToCopy)) {
      this.extsToCopy = this.renderConfig.copyResource?.config?.extsToCopy;
    }
  }

  protected async doRender(filePath: string, rootDir: string, outDir: string) {
    if (this.extsToCopy.some((ext) => filePath.endsWith(ext))) {
      this.logger.info("copy resource for ", filePath);
      FileSystemHelper.copyFile({
        sourceFilePath: filePath,
        rootDir,
        outDir,
      });
    }
  }
}
