"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewriteJavascriptRenderer = void 0;
const fs = require("fs");
const Renderable_1 = require("../Renderable");
const uglify = require("uglify-js");
class RewriteJavascriptRenderer extends Renderable_1.Renderable {
    constructor() {
        super(...arguments);
        this.IMPORT_MODULE_PATTERN = /import(?:.*?)from\s*(?:'|")(.+?)(?:'|")\s*;?/gi;
    }
    doRender(filePath, rootDir, outDir, renderConfig) {
        if (filePath.endsWith(".js")) {
            return this.jsRewriteImportFile(filePath, renderConfig);
        }
        else {
            return Promise.resolve();
        }
    }
    jsRewriteImportFile(path = "", renderConfig) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info(path);
            let fileContent = fs.readFileSync(path).toString();
            {
                const willRewriteImport = (_b = (_a = renderConfig.rewriteJavascript) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.rewriteImport;
                if (undefined == willRewriteImport || willRewriteImport) {
                    this.logger.info("[rewriteImport] render: ", path);
                    const matchArray = fileContent.matchAll(this.IMPORT_MODULE_PATTERN);
                    for (const matching of matchArray) {
                        const [matchedString, groupMatch] = matching;
                        if (!groupMatch.endsWith(".js")) {
                            const convertedString = matchedString.replace(groupMatch, `${groupMatch}.js`);
                            fileContent = fileContent.replace(matchedString, convertedString);
                        }
                    }
                }
            }
            if ((_d = (_c = renderConfig.rewriteJavascript) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.compress) {
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
                }
                else {
                    fileContent = code;
                }
            }
            fs.writeFileSync(path, fileContent);
        });
    }
}
exports.RewriteJavascriptRenderer = RewriteJavascriptRenderer;
//# sourceMappingURL=RewriteJavascriptRenderer.js.map