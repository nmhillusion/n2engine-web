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
exports.PugRenderer = void 0;
const pug = require("pug");
const FileSystemHelper_1 = require("../../helper/FileSystemHelper");
const Renderable_1 = require("../Renderable");
class PugRenderer extends Renderable_1.Renderable {
    constructor() {
        super(...arguments);
        this.PATTERN__LINK_SCSS = /<link(?:.+?)href=(?:'|")(?:.+?)(\.scss|\.sass)(?:'|")(?:.*?)>/;
        this.PATTERN__LINK_TS = /<script(?:.+?)src=(?:'|")(?:.+?)(\.ts)(?:'|")(?:.*?)>/;
    }
    renameForImportScss(content) {
        const matches = content.matchAll(new RegExp(this.PATTERN__LINK_SCSS, "gi"));
        let reg = null;
        while ((reg = matches.next()) && !reg.done) {
            content = content.replace(reg.value[0], function (place, ...rest) {
                return place.replace(reg.value[1], ".css");
            });
        }
        return content;
    }
    renameForImportTs(content) {
        const matches = content.matchAll(new RegExp(this.PATTERN__LINK_TS, "gi"));
        let reg = null;
        while ((reg = matches.next()) && !reg.done) {
            content = content.replace(reg.value[0], function (place, ...rest) {
                return place.replace(reg.value[1], ".js");
            });
        }
        return content;
    }
    doRender(filePath, rootDir, outDir, renderConfig) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (filePath.endsWith(".pug")) {
                this.logger.info(filePath);
                const configToRender = {
                    pretty: true,
                };
                if ((_a = renderConfig === null || renderConfig === void 0 ? void 0 : renderConfig.pug) === null || _a === void 0 ? void 0 : _a.config) {
                    Object.assign(configToRender, renderConfig.pug.config);
                }
                let rendered = pug.renderFile(filePath, configToRender);
                rendered = this.renameForImportTs(rendered);
                rendered = this.renameForImportScss(rendered);
                FileSystemHelper_1.FileSystemHelper.writeOutFile({
                    data: rendered,
                    outDir,
                    rootDir,
                    sourceFilePath: filePath,
                    outExtension: ".html",
                });
            }
        });
    }
}
exports.PugRenderer = PugRenderer;
//# sourceMappingURL=PugRenderer.js.map