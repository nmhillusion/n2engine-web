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
exports.TypeScriptRenderer = void 0;
var fs = require("fs");
var shelljs = require("shelljs");
var Renderable_1 = require("./Renderable");
var index_1 = require("../index");
var TypeScriptRenderer = /** @class */ (function (_super) {
    __extends(TypeScriptRenderer, _super);
    function TypeScriptRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.userTsConfigPath = index_1.WORKSPACE_DIR + "/user.tsconfig.json";
        _this.userBaseTsConfigPath = index_1.WORKSPACE_DIR + "/user.base.tsconfig.json";
        return _this;
    }
    TypeScriptRenderer.prototype.readUserTsConfigFile = function () {
        return fs.readFileSync(this.userBaseTsConfigPath).toString();
    };
    TypeScriptRenderer.prototype.writeUserTsConfigFile = function (data) {
        fs.writeFileSync(this.userTsConfigPath, data);
    };
    TypeScriptRenderer.prototype.doRender = function (filePath, rootDir, outDir) {
        if (filePath.endsWith(".ts")) {
            console.log("[typescript] render: ", filePath);
            var tsConfig = JSON.parse(this.readUserTsConfigFile());
            tsConfig.files = [filePath];
            tsConfig.compilerOptions.rootDir = rootDir;
            tsConfig.compilerOptions.outDir = outDir;
            this.writeUserTsConfigFile(JSON.stringify(tsConfig));
            shelljs.exec(
            // `${WORKSPACE_DIR}/node_modules/.bin/tsc --project ${WORKSPACE_DIR}/user.tsconfig.json`
            "npx tsc --project ".concat(index_1.WORKSPACE_DIR, "/user.tsconfig.json"));
        }
    };
    return TypeScriptRenderer;
}(Renderable_1.Renderable));
exports.TypeScriptRenderer = TypeScriptRenderer;
//# sourceMappingURL=TypeScriptRenderer.js.map