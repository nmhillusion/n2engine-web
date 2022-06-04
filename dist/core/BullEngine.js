"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullEngine = void 0;
var InjectVariableRenderer_1 = require("../renderer/InjectVariableRenderer");
var PugRenderer_1 = require("../renderer/PugRenderer");
var ScssRenderer_1 = require("../renderer/ScssRenderer");
var TraversalWorkspace_1 = require("./TraversalWorkspace");
var TypeScriptRenderer_1 = require("../renderer/TypeScriptRenderer");
var BullEngine = /** @class */ (function () {
    function BullEngine() {
        this.traversalerRootDir = new TraversalWorkspace_1.TraversalWorkspace();
        this.traversalerOutDir = new TraversalWorkspace_1.TraversalWorkspace();
    }
    BullEngine.prototype.config = function (renderConfig) {
        if (renderConfig) {
            this.renderConfig = renderConfig;
        }
        return this;
    };
    BullEngine.prototype.setVariableFilePathToInject = function (path) {
        if (path) {
            this.__variableFilePathToInject = path;
        }
        return this;
    };
    BullEngine.prototype.registerForRenderer = function (renderer) {
        renderer === null || renderer === void 0 ? void 0 : renderer.registerRender(this.renderConfig.rootDir, this.renderConfig.outDir);
    };
    BullEngine.prototype.render = function () {
        if (!this.renderConfig) {
            console.error("Does not exist config to run rendering");
            return;
        }
        if (!!this.__variableFilePathToInject) {
            this.registerForRenderer(new InjectVariableRenderer_1.InjectVariableRenderer(this.__variableFilePathToInject, this.traversalerOutDir));
        }
        if (this.renderConfig.pug.enabled) {
            this.registerForRenderer(new PugRenderer_1.PugRenderer(this.traversalerRootDir));
        }
        if (this.renderConfig.scss.enabled) {
            this.registerForRenderer(new ScssRenderer_1.ScssRenderer(this.traversalerRootDir));
        }
        if (this.renderConfig.typescript.enabled) {
            this.registerForRenderer(new TypeScriptRenderer_1.TypeScriptRenderer(this.traversalerRootDir));
        }
        this.traversalerRootDir.traversalPath(this.renderConfig.rootDir);
        this.traversalerOutDir.traversalPath(this.renderConfig.outDir);
    };
    return BullEngine;
}());
exports.BullEngine = BullEngine;
//# sourceMappingURL=BullEngine.js.map