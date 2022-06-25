import * as fs from "fs";
import { Renderable } from "./Renderable";
import * as uglify from "uglify-js";
import { RenderConfig } from "../model";

export class RewriteJavascriptRenderer extends Renderable {
  private readonly IMPORT_MODULE_PATTERN: RegExp =
    /import(?:.*?)from\s*(?:'|")(.+?)(?:'|")\s*;?/gi;

  protected doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (filePath.endsWith(".js")) {
      this.jsRewriteImportFile(filePath, renderConfig);
    }
  }

  private jsRewriteImportFile(path = "", renderConfig: RenderConfig) {
    this.logger.info(path);

    let fileContent = fs.readFileSync(path).toString();
    {
      const willRewriteImport = renderConfig.rewriteJavascript?.rewriteImport;
      if (undefined == willRewriteImport || willRewriteImport) {
        this.logger.info("[rewriteImport] render: ", path);

        const matchArray = fileContent.matchAll(this.IMPORT_MODULE_PATTERN);
        for (const matching of matchArray) {
          const [matchedString, groupMatch] = matching;
          const convertedString = matchedString.replace(
            groupMatch,
            `${groupMatch}.js`
          );

          fileContent = fileContent.replace(matchedString, convertedString);
        }
      }
    }

    if (renderConfig.rewriteJavascript?.compress) {
      this.logger.info("[rewriteCompress] render: ", path);

      fileContent = uglify.minify(fileContent, {
        compress: {
          passes: 2,
        },
        output: {
          beautify: false,
        },
      }).code;
    }

    fs.writeFileSync(path, fileContent);
  }
}
