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
exports.BullEngine = void 0;
const TraversalWorkspace_1 = require("./TraversalWorkspace");
const renderer_1 = require("../renderer");
class BullEngine {
    constructor() {
        this.traversalerRootDir = new TraversalWorkspace_1.TraversalWorkspace();
        this.traversalerOutDir = new TraversalWorkspace_1.TraversalWorkspace();
    }
    config(renderConfig) {
        if (renderConfig) {
            this.renderConfig =
                this.traversalerRootDir.renderConfig =
                    this.traversalerOutDir.renderConfig =
                        renderConfig;
        }
        return this;
    }
    setVariableFilePathToInject(path) {
        if (path) {
            this.variableFilePathToInject_ = path;
        }
        return this;
    }
    registerForRenderer(renderer) {
        renderer === null || renderer === void 0 ? void 0 : renderer.registerRender(this.renderConfig.rootDir, this.renderConfig.outDir, this.renderConfig);
    }
    render() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.renderConfig) {
                console.error("Does not exist config to run rendering");
                return;
            }
            if (this.renderConfig.pug.enabled) {
                this.registerForRenderer(new renderer_1.PugRenderer(this.traversalerRootDir));
            }
            if (this.renderConfig.scss.enabled) {
                this.registerForRenderer(new renderer_1.ScssRenderer(this.traversalerRootDir));
            }
            if (this.renderConfig.typescript.enabled) {
                this.registerForRenderer(new renderer_1.TypeScriptRenderer(this.traversalerRootDir));
            }
            if (this.renderConfig.copyResource.enabled) {
                this.registerForRenderer(new renderer_1.CopyResourceRenderer(this.traversalerRootDir));
            }
            if (!!this.variableFilePathToInject_) {
                this.registerForRenderer(new renderer_1.InjectVariableRenderer(this.variableFilePathToInject_, this.traversalerOutDir));
            }
            if ((_a = this.renderConfig.rewriteJavascript) === null || _a === void 0 ? void 0 : _a.enabled) {
                this.registerForRenderer(new renderer_1.RewriteJavascriptRenderer(this.traversalerOutDir));
            }
            yield this.traversalerRootDir.traversalPath(this.renderConfig.rootDir);
            yield this.traversalerOutDir.traversalPath(this.renderConfig.outDir);
        });
    }
}
exports.BullEngine = BullEngine;
//# sourceMappingURL=BullEngine.js.map