"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewriteJavascriptRenderer = void 0;
const fs = require("fs");
const Renderable_1 = require("./Renderable");
const uglify = require("uglify-js");
class RewriteJavascriptRenderer extends Renderable_1.Renderable {
    constructor() {
        super(...arguments);
        this.IMPORT_MODULE_PATTERN = /import(?:.*?)from\s*(?:'|")(.+?)(?:'|")\s*;?/gi;
    }
    doRender(filePath, rootDir, outDir, renderConfig) {
        if (filePath.endsWith(".js")) {
            this.jsRewriteImportFile(filePath, renderConfig);
        }
    }
    jsRewriteImportFile(path = "", renderConfig) {
        var _a, _b;
        this.logger.info(path);
        let fileContent = fs.readFileSync(path).toString();
        {
            const willRewriteImport = (_a = renderConfig.rewriteJavascript) === null || _a === void 0 ? void 0 : _a.rewriteImport;
            if (undefined == willRewriteImport || willRewriteImport) {
                this.logger.info("[rewriteImport] render: ", path);
                const matchArray = fileContent.matchAll(this.IMPORT_MODULE_PATTERN);
                for (const matching of matchArray) {
                    const [matchedString, groupMatch] = matching;
                    const convertedString = matchedString.replace(groupMatch, `${groupMatch}.js`);
                    fileContent = fileContent.replace(matchedString, convertedString);
                }
            }
        }
        if ((_b = renderConfig.rewriteJavascript) === null || _b === void 0 ? void 0 : _b.compress) {
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
exports.RewriteJavascriptRenderer = RewriteJavascriptRenderer;
//# sourceMappingURL=RewriteJavascriptRenderer.js.map