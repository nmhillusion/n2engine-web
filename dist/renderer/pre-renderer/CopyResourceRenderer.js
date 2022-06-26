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
exports.CopyResourceRenderer = void 0;
const FileSystemHelper_1 = require("../../helper/FileSystemHelper");
const Renderable_1 = require("../Renderable");
class CopyResourceRenderer extends Renderable_1.Renderable {
    doRender(filePath, rootDir, outDir, renderConfig) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.CopyResourceRenderer = CopyResourceRenderer;
//# sourceMappingURL=CopyResourceRenderer.js.map