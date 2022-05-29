import * as pug from "pug";
import { FileSystemHelper } from "./FileSystemHelper";
import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";

export class PugRenderer extends Renderable {
  private readonly PATTERN__LINK_SCSS =
    /<link(?:.+?)href=(?:'|")(?:.+?)(\.scss)(?:'|")(?:.*?)>/;
  private readonly PATTERN__LINK_TS =
    /<script(?:.+?)src=(?:'|")(?:.+?)(\.ts)(?:'|")(?:.*?)>/;

  constructor(traversaler: TraversalWorkspace) {
    super(traversaler);
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

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (filePath.endsWith(".pug")) {
      let rendered = pug.renderFile(filePath, {
        pretty: true,
      });

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
