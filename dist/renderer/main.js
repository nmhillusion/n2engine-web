"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.N2EngineRenderer = void 0;
var InjectVariableRenderer_1 = require("./InjectVariableRenderer");
var PugRenderer_1 = require("./PugRenderer");
var ScssRenderer_1 = require("./ScssRenderer");
var TraversalWorkspace_1 = require("./TraversalWorkspace");
var TypeScriptRenderer_1 = require("./TypeScriptRenderer");
var N2EngineRenderer = /** @class */ (function () {
    function N2EngineRenderer() {
        this.traversalerRootDir = new TraversalWorkspace_1.TraversalWorkspace();
        this.traversalerOutDir = new TraversalWorkspace_1.TraversalWorkspace();
    }
    N2EngineRenderer.prototype.config = function (renderConfig) {
        if (renderConfig) {
            this.renderConfig = renderConfig;
        }
        return this;
    };
    N2EngineRenderer.prototype.setVariableFilePathToInject = function (path) {
        if (path) {
            this.__variableFilePathToInject = path;
        }
        return this;
    };
    N2EngineRenderer.prototype.registerForRenderer = function (renderer) {
        renderer === null || renderer === void 0 ? void 0 : renderer.registerRender(this.renderConfig.rootDir, this.renderConfig.outDir);
    };
    N2EngineRenderer.prototype.render = function () {
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
    return N2EngineRenderer;
}());
exports.N2EngineRenderer = N2EngineRenderer;
//# sourceMappingURL=main.js.map