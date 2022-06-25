"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderable = void 0;
const n2log4web_1 = require("n2log4web");
class Renderable {
    constructor(traversaler) {
        this.traversaler = traversaler;
        this.logger = n2log4web_1.LogFactory.fromConfig(new n2log4web_1.LoggerConfig().setLoggableLevel(n2log4web_1.LOG_LEVELS.DEBUG)).getNodeLog(this.constructor.name);
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