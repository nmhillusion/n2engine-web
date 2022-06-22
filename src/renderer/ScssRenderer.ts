import * as sass from "node-sass";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { FileSystemHelper } from "../helper/FileSystemHelper";
import { RenderConfig } from "../model/RenderConfig";
import { Renderable } from "./Renderable";

export class ScssRenderer extends Renderable {

  constructor(traversaller: TraversalWorkspace) {
    super(traversaller, "ScssRenderer");
  }

  protected doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (filePath.endsWith(".scss") || filePath.endsWith(".sass")) {
      this.logger.info(filePath);

      const configToRender: sass.SyncOptions = {};
      if (renderConfig?.scss?.config) {
        Object.assign(configToRender, renderConfig.scss.config);
      }

      Object.assign(configToRender, { file: filePath });
      const { css } = sass.renderSync(configToRender);

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
