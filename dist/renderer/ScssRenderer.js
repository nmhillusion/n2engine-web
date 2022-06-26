"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScssRenderer = void 0;
const sass = require("node-sass");
const fs = require("fs");
const FileSystemHelper_1 = require("../helper/FileSystemHelper");
const Renderable_1 = require("./Renderable");
class ScssRenderer extends Renderable_1.Renderable {
    doRender(filePath, rootDir, outDir, renderConfig) {
        var _a;
        if (filePath.endsWith(".scss") || filePath.endsWith(".sass")) {
            this.logger.info(filePath);
            const configToRender = {};
            if ((_a = renderConfig === null || renderConfig === void 0 ? void 0 : renderConfig.scss) === null || _a === void 0 ? void 0 : _a.config) {
                Object.assign(configToRender, renderConfig.scss.config);
            }
            const fileContent = fs.readFileSync(filePath).toString();
            Object.assign(configToRender, {
                data: fileContent,
            });
            const { css } = sass.renderSync(configToRender);
            let rendered = css.toString();
            FileSystemHelper_1.FileSystemHelper.writeOutFile({
                data: rendered,
                outDir,
                rootDir,
                sourceFilePath: filePath,
                outExtension: ".css",
            });
        }
    }
}
exports.ScssRenderer = ScssRenderer;
//# sourceMappingURL=ScssRenderer.js.map