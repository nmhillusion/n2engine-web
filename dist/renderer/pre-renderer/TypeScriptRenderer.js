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
exports.TypeScriptRenderer = void 0;
const fs = require("fs");
const shelljs = require("shelljs");
const Renderable_1 = require("../Renderable");
const index_1 = require("../../index");
class TypeScriptRenderer extends Renderable_1.Renderable {
    constructor(traversal) {
        super(traversal);
        this.userTsConfigPath = index_1.WORKSPACE_DIR + "/user.tsconfig.json";
        this.userBaseTsConfigPath = index_1.WORKSPACE_DIR + "/user.base.tsconfig.json";
        this.ableToExecution = true;
        const npxWhich = shelljs.which("npx");
        if (!npxWhich || 0 == String(npxWhich).trim().length) {
            this.logger.error("Required to install command `npx` to use Typescript renderer.");
            this.ableToExecution = false;
        }
    }
    readUserTsConfigFile() {
        return fs.readFileSync(this.userBaseTsConfigPath).toString();
    }
    writeUserTsConfigFile(data) {
        fs.writeFileSync(this.userTsConfigPath, data);
    }
    doRender(filePath, rootDir, outDir, renderConfig) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ableToExecution &&
                filePath.endsWith(".ts") &&
                // not compile declaration file of typescript
                !filePath.endsWith(".d.ts")) {
                this.logger.info(filePath);
                const tsConfig = JSON.parse(this.readUserTsConfigFile());
                if ((_a = renderConfig === null || renderConfig === void 0 ? void 0 : renderConfig.typescript) === null || _a === void 0 ? void 0 : _a.config) {
                    const userTsConfig = (_b = renderConfig === null || renderConfig === void 0 ? void 0 : renderConfig.typescript) === null || _b === void 0 ? void 0 : _b.config;
                    for (const configKey of Object.keys(userTsConfig)) {
                        if (!(configKey in tsConfig)) {
                            tsConfig[configKey] = {};
                        }
                        Object.assign(tsConfig[configKey], userTsConfig[configKey]);
                    }
                }
                tsConfig.files = [filePath];
                tsConfig.compilerOptions.rootDir = rootDir;
                tsConfig.compilerOptions.outDir = outDir;
                this.writeUserTsConfigFile(JSON.stringify(tsConfig));
                const { code, stderr, stdout } = shelljs.exec(`npx tsc --project ${index_1.WORKSPACE_DIR}/user.tsconfig.json`, {
                    async: false,
                });
                this.logger.debug({ code, stderr, stdout });
            }
        });
    }
}
exports.TypeScriptRenderer = TypeScriptRenderer;
//# sourceMappingURL=TypeScriptRenderer.js.map