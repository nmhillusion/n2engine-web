"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderable = void 0;
class Renderable {
    constructor(traversaler) {
        this.traversaler = traversaler;
    }
    registerRender(rootDir, outDir, renderConfig) {
        const self = this;
        this.traversaler.registerCallback({
            invoke(filePath) {
                self.doRender(filePath, rootDir, outDir, renderConfig);
            },
        });
    }
}
exports.Renderable = Renderable;
//# sourceMappingURL=Renderable.js.map