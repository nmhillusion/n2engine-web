import * as fs from "fs";
import { Renderable } from "../Renderable";
import * as uglify from "uglify-js";
import { RenderConfig } from "../../model";

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
      return this.jsRewriteImportFile(filePath, renderConfig);
    } else {
      return Promise.resolve();
    }
  }

  private async jsRewriteImportFile(path = "", renderConfig: RenderConfig) {
    this.logger.info(path);

    let fileContent = fs.readFileSync(path).toString();
    {
      const willRewriteImport =
        renderConfig.rewriteJavascript?.config?.rewriteImport;
      if (undefined == willRewriteImport || willRewriteImport) {
        this.logger.info("[rewriteImport] render: ", path);

        const matchArray = fileContent.matchAll(this.IMPORT_MODULE_PATTERN);

        for (const matching of matchArray) {
          const [matchedString, groupMatch] = matching;
          if (!groupMatch.endsWith(".js")) {
            const convertedString = matchedString.replace(
              groupMatch,
              `${groupMatch}.js`
            );

            fileContent = fileContent.replace(matchedString, convertedString);
          }
        }
      }
    }

    if (renderConfig.rewriteJavascript?.config?.compress) {
      this.logger.info("[rewriteCompress] render: ", path);
      const { code, error } = uglify.minify(fileContent, {
        compress: {
          passes: 2,
        },
        output: {
          beautify: false,
        },
      });
      if (error) {
        this.logger.error(" error when uglify compress: ", error);
      } else {
        fileContent = code;
      }
    }
    fs.writeFileSync(path, fileContent);
  }
}
