import * as sass from "sass";
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

      const configToRender: sass.Options<"sync"> = {};
      if (renderConfig?.scss?.config) {
        Object.assign(configToRender, renderConfig.scss.config);
      }

      const { css } = sass.compile(filePath, configToRender);

      console.log("TEST SCSS: ", css);

      let rendered: string = css;

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
