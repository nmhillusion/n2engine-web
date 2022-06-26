import * as sass from "node-sass";
import * as fs from "fs";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model/RenderConfig";
import { Renderable } from "../Renderable";

export class ScssRenderer extends Renderable {
  protected async doRender(
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

      const fileContent = fs.readFileSync(filePath).toString();

      Object.assign(configToRender, {
        data: fileContent,
      });
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
