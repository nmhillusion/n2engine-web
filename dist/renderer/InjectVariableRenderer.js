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
exports.InjectVariableRenderer = void 0;
var fs = require("fs");
var Renderable_1 = require("./Renderable");
var InjectVariableRenderer = /** @class */ (function (_super) {
    __extends(InjectVariableRenderer, _super);
    function InjectVariableRenderer(variableFilePathToInject, traversaler) {
        var _this = _super.call(this, traversaler) || this;
        _this.variables = {};
        _this.PATTERN__VARIABLE_REPLACEMENT = /{{\s*n2v:(.+?)\s*}}/;
        _this.loadVariableFromFile(variableFilePathToInject);
        return _this;
    }
    InjectVariableRenderer.prototype.loadVariableFromFile = function (filePath) {
        try {
            var rawContent = fs.readFileSync(filePath).toString();
            Object.assign(this.variables, JSON.parse(rawContent));
        }
        catch (e) {
            console.error("Error when loading varibles from file: ", filePath, e);
        }
    };
    InjectVariableRenderer.prototype.obtainValueOfVariable = function (variableName) {
        if (variableName) {
            var variableQueue = variableName.split(".");
            var value = this.variables;
            for (var _i = 0, variableQueue_1 = variableQueue; _i < variableQueue_1.length; _i++) {
                var __currentKey = variableQueue_1[_i];
                value = value[__currentKey];
                if (!value) {
                    break;
                }
            }
            if (this.variables === value) {
                throw new Error("Privilege Error: Not allow to access root variable");
            }
            return String(value);
        }
        else {
            return variableName;
        }
    };
    InjectVariableRenderer.prototype.doRender = function (filePath, rootDir, outDir) {
        var _this = this;
        if (filePath &&
            (filePath.endsWith(".html") ||
                filePath.endsWith(".css") ||
                filePath.endsWith(".js"))) {
            var fileContent = fs.readFileSync(filePath).toString();
            var matches = fileContent.matchAll(new RegExp(this.PATTERN__VARIABLE_REPLACEMENT, "gi"));
            var reg_1 = null;
            while ((reg_1 = matches.next()) && !reg_1.done) {
                console.log("[inject var]: var -> ", reg_1.value[1], "; file -> ", filePath);
                fileContent = fileContent.replace(reg_1.value[0], function (_) {
                    return _this.obtainValueOfVariable(reg_1.value[1]);
                });
            }
            fs.writeFileSync(filePath, fileContent);
        }
    };
    return InjectVariableRenderer;
}(Renderable_1.Renderable));
exports.InjectVariableRenderer = InjectVariableRenderer;
//# sourceMappingURL=InjectVariableRenderer.js.map