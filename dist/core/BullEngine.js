"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullEngine = void 0;
const InjectVariableRenderer_1 = require("../renderer/InjectVariableRenderer");
const PugRenderer_1 = require("../renderer/PugRenderer");
const ScssRenderer_1 = require("../renderer/ScssRenderer");
const TraversalWorkspace_1 = require("./TraversalWorkspace");
const TypeScriptRenderer_1 = require("../renderer/TypeScriptRenderer");
const RewriteJavascriptRenderer_1 = require("../renderer/RewriteJavascriptRenderer");
const CopyResourceRenderer_1 = require("../renderer/CopyResourceRenderer");
class BullEngine {
    constructor() {
        this.traversalerRootDir = new TraversalWorkspace_1.TraversalWorkspace();
        this.traversalerOutDir = new TraversalWorkspace_1.TraversalWorkspace();
    }
    config(renderConfig) {
        if (renderConfig) {
            this.renderConfig = renderConfig;
        }
        return this;
    }
    setVariableFilePathToInject(path) {
        if (path) {
            this.__variableFilePathToInject = path;
        }
        return this;
    }
    registerForRenderer(renderer) {
        renderer === null || renderer === void 0 ? void 0 : renderer.registerRender(this.renderConfig.rootDir, this.renderConfig.outDir, this.renderConfig);
    }
    render() {
        var _a;
        if (!this.renderConfig) {
            console.error("Does not exist config to run rendering");
            return;
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
        if ((_a = this.renderConfig.rewriteJavascript) === null || _a === void 0 ? void 0 : _a.enabled) {
            this.registerForRenderer(new RewriteJavascriptRenderer_1.RewriteJavascriptRenderer(this.traversalerOutDir));
        }
        if (this.renderConfig.copyResource.enabled) {
            this.registerForRenderer(new CopyResourceRenderer_1.CopyResourceRenderer(this.traversalerRootDir));
        }
        if (!!this.__variableFilePathToInject) {
            this.registerForRenderer(new InjectVariableRenderer_1.InjectVariableRenderer(this.__variableFilePathToInject, this.traversalerOutDir));
        }
        this.traversalerRootDir.traversalPath(this.renderConfig.rootDir);
        this.traversalerOutDir.traversalPath(this.renderConfig.outDir);
    }
}
exports.BullEngine = BullEngine;
//# sourceMappingURL=BullEngine.js.map