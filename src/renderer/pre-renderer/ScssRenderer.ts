import * as sass from "sass";
import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model/RenderConfig";
import { Renderable } from "../Renderable";

export class ScssRenderer extends Renderable {
  private selfConfig: sass.Options<"sync"> = {};

  constructor(
    traversal: TraversalWorkspace,
    engineState: BullEngineState,
    renderConfig: RenderConfig
  ) {
    super(traversal, engineState, renderConfig);
  }

  protected override setupSelfConfig() {
    const renderConfig = this.renderConfig;

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

    this.selfConfig = configToRender;
  }

  protected async doRender(filePath: string, rootDir: string, outDir: string) {
    // filePath = path.resolve(filePath);
    if (filePath.endsWith(".scss") || filePath.endsWith(".sass")) {
      this.logger.info(filePath);

      // const scssContent = fs.readFileSync(filePath).toString();
      // this.logger.debug("TEST SCSS: file: ", filePath, scssContent);

      const { css: cssBuffer } = sass.compile(filePath, this.selfConfig);

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
