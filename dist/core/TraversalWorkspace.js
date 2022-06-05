"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraversalWorkspace = void 0;
const fs = require("fs");
class TraversalWorkspace {
    constructor() {
        this.listeners = [];
    }
    __traversal(startDir, callback) {
        const dirList = fs.readdirSync(startDir);
        for (const pItem of dirList) {
            const pItemPath = `${startDir}/${pItem}`;
            const itemState = fs.lstatSync(pItemPath);
            if (itemState.isDirectory()) {
                this.__traversal(pItemPath, callback);
            }
            else if (itemState.isFile()) {
                callback(pItemPath);
            }
        }
    }
    __callbackTraversal(filePath) {
        if (this.listeners) {
            for (const listener of this.listeners) {
                listener === null || listener === void 0 ? void 0 : listener.invoke(filePath);
            }
        }
    }
    registerCallback(callback) {
        if (callback) {
            this.listeners.push(callback);
        }
    }
    traversalPath(startDir) {
        this.__traversal(startDir, this.__callbackTraversal.bind(this));
    }
}
exports.TraversalWorkspace = TraversalWorkspace;
//# sourceMappingURL=TraversalWorkspace.js.map