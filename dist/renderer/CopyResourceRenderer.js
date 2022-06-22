"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyResourceRenderer = void 0;
const FileSystemHelper_1 = require("../helper/FileSystemHelper");
const Renderable_1 = require("./Renderable");
class CopyResourceRenderer extends Renderable_1.Renderable {
    constructor(traversaller) {
        super(traversaller, "CopyResourceRenderer");
    }
    doRender(filePath, rootDir, outDir, renderConfig) {
        if ((renderConfig.copyResource.extsToCopy || [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".ico",
            ".woff",
            ".ttf",
        ]).some((ext) => filePath.endsWith(ext))) {
            this.logger.info("copy resource for ", filePath);
            FileSystemHelper_1.FileSystemHelper.copyFile({
                sourceFilePath: filePath,
                rootDir,
                outDir,
            });
        }
    }
}
exports.CopyResourceRenderer = CopyResourceRenderer;
//# sourceMappingURL=CopyResourceRenderer.js.map