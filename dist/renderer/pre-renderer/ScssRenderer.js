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
exports.ScssRenderer = void 0;
const sass = require("sass");
const fs = require("fs");
const FileSystemHelper_1 = require("../../helper/FileSystemHelper");
const Renderable_1 = require("../Renderable");
class ScssRenderer extends Renderable_1.Renderable {
    doRender(filePath, rootDir, outDir, renderConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // filePath = path.resolve(filePath);
            if (filePath.endsWith(".scss") || filePath.endsWith(".sass")) {
                this.logger.info(filePath);
                const scssContent = fs.readFileSync(filePath).toString();
                // this.logger.debug("TEST SCSS: file: ", filePath, scssContent);
                const configToRender = {
                    logger: {
                        debug: (message, options) => {
                            this.logger.debug(message, options);
                        },
                        warn: (message, options) => {
                            this.logger.warn(message, options);
                        },
                    },
                };
                if ((_a = renderConfig === null || renderConfig === void 0 ? void 0 : renderConfig.scss) === null || _a === void 0 ? void 0 : _a.config) {
                    Object.assign(configToRender, renderConfig.scss.config);
                }
                const { css: cssBuffer } = sass.compileString(scssContent, configToRender);
                let rendered = String(cssBuffer);
                // this.logger.debug("TEST SCSS: css: ", { rendered });
                FileSystemHelper_1.FileSystemHelper.writeOutFile({
                    data: rendered,
                    outDir,
                    rootDir,
                    sourceFilePath: filePath,
                    outExtension: ".css",
                });
            }
        });
    }
}
exports.ScssRenderer = ScssRenderer;
//# sourceMappingURL=ScssRenderer.js.map