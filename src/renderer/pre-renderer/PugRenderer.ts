import * as pug from "pug";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";
import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";

export class PugRenderer extends Renderable {
  private readonly PATTERN__LINK_SCSS =
    /<link(?:.+?)href=(?:'|")(?:.+?)(\.scss|\.sass)(?:'|")(?:.*?)>/;
  private readonly PATTERN__LINK_TS =
    /<script(?:.+?)src=(?:'|")(?:.+?)(\.ts)(?:'|")(?:.*?)>/;

  constructor(
    traversaler: TraversalWorkspace,
    engineState: BullEngineState,
    renderConfig: RenderConfig
  ) {
    super(traversaler, engineState, renderConfig);
  }

  private renameForImportScss(content: string): string {
    const matches = content.matchAll(new RegExp(this.PATTERN__LINK_SCSS, "gi"));

    let reg: IteratorResult<RegExpMatchArray, any> = null;
    while ((reg = matches.next()) && !reg.done) {
      content = content.replace(
        reg.value[0],
        function (place: string, ...rest: any[]) {
          return place.replace(reg.value[1], ".css");
        }
      );
    }

    return content;
  }

  private renameForImportTs(content: string): string {
    const matches = content.matchAll(new RegExp(this.PATTERN__LINK_TS, "gi"));

    let reg: IteratorResult<RegExpMatchArray, any> = null;
    while ((reg = matches.next()) && !reg.done) {
      content = content.replace(
        reg.value[0],
        function (place: string, ...rest: any[]) {
          return place.replace(reg.value[1], ".js");
        }
      );
    }

    return content;
  }

  protected async doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".pug")) {
      this.logger.info(filePath);
      const renderConfig = this.renderConfig;

      const configToRender = {
        pretty: true,
      };

      if (renderConfig?.pug?.config) {
        Object.assign(configToRender, renderConfig.pug.config);
      }

      let rendered = pug.renderFile(filePath, configToRender);

      rendered = this.renameForImportTs(rendered);
      rendered = this.renameForImportScss(rendered);

      FileSystemHelper.writeOutFile({
        data: rendered,
        outDir,
        rootDir,
        sourceFilePath: filePath,
        outExtension: ".html",
      });
    }
  }
}
