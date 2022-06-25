"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewriteImportOfTsRenderer = void 0;
const fs = require("fs");
const Renderable_1 = require("./Renderable");
const uglify = require("uglify-js");
class RewriteImportOfTsRenderer extends Renderable_1.Renderable {
    constructor(traversaller) {
        super(traversaller, "RewriteImportOfTsRenderer");
        this.IMPORT_MODULE_PATTERN = /import(?:.*?)from\s*(?:'|")(.+?)(?:'|")\s*;?/gi;
    }
    doRender(filePath, rootDir, outDir) {
        if (filePath.endsWith(".js")) {
            console.log("[rewriteImport] render: ", filePath);
            this.jsRewriteImportFile(filePath);
        }
    }
    jsRewriteImportFile(path = "") {
        if (path.endsWith(".js")) {
            this.logger.info(path);
            let fileContent = fs.readFileSync(path).toString();
            const matchArray = fileContent.matchAll(this.IMPORT_MODULE_PATTERN);
            for (const matching of matchArray) {
                const [matchedString, groupMatch] = matching;
                const convertedString = matchedString.replace(groupMatch, `${groupMatch}.js`);
                fileContent = fileContent.replace(matchedString, convertedString);
                // logger.log({ matchedString, groupMatch, fileContent });
            }
            const minifiedCode = uglify.minify(fileContent, {
                compress: {
                    passes: 2,
                },
                output: {
                    beautify: false,
                },
            }).code;
            fs.writeFileSync(path, minifiedCode);
        }
    }
}
exports.RewriteImportOfTsRenderer = RewriteImportOfTsRenderer;
//# sourceMappingURL=RewriteImportOfTsRenderer.js.map