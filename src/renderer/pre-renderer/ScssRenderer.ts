import sass = require("sass");
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
    // filePath = path.resolve(filePath);
    if (filePath.endsWith(".scss") || filePath.endsWith(".sass")) {
      this.logger.info(filePath);

      // const scssContent = fs.readFileSync(filePath).toString();
      // this.logger.debug("TEST SCSS: file: ", filePath, scssContent);

      const configToRender: sass.Options<"sync"> = {
        logger: {
          debug: (message, options) => {
            this.logger.debug(message, options);
          },
          warn: (message, options) => {
            this.logger.warn(message, options);
          },
        },
      };

      if (renderConfig?.scss?.config) {
        Object.assign(configToRender, renderConfig.scss.config);
      }

      const { css: cssBuffer } = sass.compile(filePath, configToRender);

      let rendered: string = String(cssBuffer);

      // this.logger.debug("TEST SCSS: css: ", { rendered });

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
