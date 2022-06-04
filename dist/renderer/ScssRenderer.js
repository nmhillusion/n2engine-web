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
exports.ScssRenderer = void 0;
var sass = require("node-sass");
var FileSystemHelper_1 = require("../helper/FileSystemHelper");
var Renderable_1 = require("./Renderable");
var ScssRenderer = /** @class */ (function (_super) {
    __extends(ScssRenderer, _super);
    function ScssRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScssRenderer.prototype.doRender = function (filePath, rootDir, outDir) {
        if (filePath.endsWith(".scss")) {
            console.log("[scss] render: ", filePath);
            var css = sass.renderSync({
                file: filePath,
            }).css;
            var rendered = css.toString();
            FileSystemHelper_1.FileSystemHelper.writeOutFile({
                data: rendered,
                outDir: outDir,
                rootDir: rootDir,
                sourceFilePath: filePath,
                outExtension: ".css",
            });
        }
    };
    return ScssRenderer;
}(Renderable_1.Renderable));
exports.ScssRenderer = ScssRenderer;
//# sourceMappingURL=ScssRenderer.js.map