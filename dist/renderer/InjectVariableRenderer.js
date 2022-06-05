"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectVariableRenderer = void 0;
const fs = require("fs");
const Renderable_1 = require("./Renderable");
class InjectVariableRenderer extends Renderable_1.Renderable {
    constructor(variableFilePathToInject, traversaler) {
        super(traversaler);
        this.variables = {};
        this.PATTERN__VARIABLE_REPLACEMENT = /{{\s*n2v:(.+?)\s*}}/gi;
        this.loadVariableFromFile(variableFilePathToInject);
    }
    loadVariableFromFile(filePath) {
        try {
            const rawContent = fs.readFileSync(filePath).toString();
            Object.assign(this.variables, JSON.parse(rawContent));
        }
        catch (e) {
            console.error("Error when loading varibles from file: ", filePath, e);
        }
    }
    obtainValueOfVariable(variableName) {
        if (variableName) {
            const variableQueue = variableName.split(".");
            let value = this.variables;
            for (const __currentKey of variableQueue) {
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
    }
    doRender(filePath, rootDir, outDir) {
        if (filePath &&
            (filePath.endsWith(".html") ||
                filePath.endsWith(".css") ||
                filePath.endsWith(".js"))) {
            let fileContent = fs.readFileSync(filePath).toString();
            const matchingArray = fileContent.matchAll(this.PATTERN__VARIABLE_REPLACEMENT);
            for (const matching of matchingArray) {
                const [matchedString, matchGroup] = matching;
                console.log("[inject var]: var -> ", matchGroup, "; file -> ", filePath);
                fileContent = fileContent.replace(matchedString, (_) => this.obtainValueOfVariable(matchGroup));
            }
            fs.writeFileSync(filePath, fileContent);
        }
    }
}
exports.InjectVariableRenderer = InjectVariableRenderer;
//# sourceMappingURL=InjectVariableRenderer.js.map