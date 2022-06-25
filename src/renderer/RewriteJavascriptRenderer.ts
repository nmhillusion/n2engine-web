import * as fs from "fs";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { Renderable } from "./Renderable";
import * as uglify from "uglify-js";
import { RenderConfig } from "../model";

export class RewriteJavascriptRenderer extends Renderable {
  private readonly IMPORT_MODULE_PATTERN: RegExp =
    /import(?:.*?)from\s*(?:'|")(.+?)(?:'|")\s*;?/gi;

  constructor(traversaller: TraversalWorkspace) {
    super(traversaller, "RewriteImportOfTsRenderer");
  }

  protected doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (filePath.endsWith(".js")) {
      console.log("[rewriteImport] render: ", filePath);

      this.jsRewriteImportFile(filePath, renderConfig);
    }
  }

  private jsRewriteImportFile(path = "", renderConfig: RenderConfig) {
    if (path.endsWith(".js")) {
      this.logger.info(path);

      let fileContent = fs.readFileSync(path).toString();
      {
        const willRewriteImport = renderConfig.rewriteJavascript?.rewriteImport;
        if (undefined == willRewriteImport || willRewriteImport) {
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
}
