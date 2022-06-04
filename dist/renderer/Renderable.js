"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderable = void 0;
var Renderable = /** @class */ (function () {
    function Renderable(traversaler) {
        this.traversaler = traversaler;
    }
    Renderable.prototype.registerRender = function (rootDir, outDir) {
        var self = this;
        this.traversaler.registerCallback({
            invoke: function (filePath) {
                self.doRender(filePath, rootDir, outDir);
            },
        });
    };
    return Renderable;
}());
exports.Renderable = Renderable;
//# sourceMappingURL=Renderable.js.map