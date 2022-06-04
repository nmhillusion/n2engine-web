"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PugRenderer = void 0;
var pug = require("pug");
var FileSystemHelper_1 = require("../helper/FileSystemHelper");
var Renderable_1 = require("./Renderable");
var PugRenderer = /** @class */ (function (_super) {
    __extends(PugRenderer, _super);
    function PugRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.PATTERN__LINK_SCSS = /<link(?:.+?)href=(?:'|")(?:.+?)(\.scss)(?:'|")(?:.*?)>/;
        _this.PATTERN__LINK_TS = /<script(?:.+?)src=(?:'|")(?:.+?)(\.ts)(?:'|")(?:.*?)>/;
        return _this;
    }
    PugRenderer.prototype.renameForImportScss = function (content) {
        var matches = content.matchAll(new RegExp(this.PATTERN__LINK_SCSS, "gi"));
        var reg = null;
        while ((reg = matches.next()) && !reg.done) {
            content = content.replace(reg.value[0], function (place) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                return place.replace(reg.value[1], ".css");
            });
        }
        return content;
    };
    PugRenderer.prototype.renameForImportTs = function (content) {
        var matches = content.matchAll(new RegExp(this.PATTERN__LINK_TS, "gi"));
        var reg = null;
        while ((reg = matches.next()) && !reg.done) {
            content = content.replace(reg.value[0], function (place) {
                var rest = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    rest[_i - 1] = arguments[_i];
                }
                return place.replace(reg.value[1], ".js");
            });
        }
        return content;
    };
    PugRenderer.prototype.doRender = function (filePath, rootDir, outDir) {
        if (filePath.endsWith(".pug")) {
            console.log("[pug] render: ", filePath);
            var rendered = pug.renderFile(filePath, {
                pretty: true,
            });
            rendered = this.renameForImportTs(rendered);
            rendered = this.renameForImportScss(rendered);
            FileSystemHelper_1.FileSystemHelper.writeOutFile({
                data: rendered,
                outDir: outDir,
                rootDir: rootDir,
                sourceFilePath: filePath,
                outExtension: ".html",
            });
        }
    };
    return PugRenderer;
}(Renderable_1.Renderable));
exports.PugRenderer = PugRenderer;
//# sourceMappingURL=PugRenderer.js.map