"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraversalWorkspace = void 0;
var fs = require("fs");
var TraversalWorkspace = /** @class */ (function () {
    function TraversalWorkspace() {
        this.listeners = [];
    }
    TraversalWorkspace.prototype.__traversal = function (startDir, callback) {
        var dirList = fs.readdirSync(startDir);
        for (var _i = 0, dirList_1 = dirList; _i < dirList_1.length; _i++) {
            var pItem = dirList_1[_i];
            var pItemPath = "".concat(startDir, "/").concat(pItem);
            var itemState = fs.lstatSync(pItemPath);
            if (itemState.isDirectory()) {
                this.__traversal(pItemPath, callback);
            }
            else if (itemState.isFile()) {
                callback(pItemPath);
            }
        }
    };
    TraversalWorkspace.prototype.__callbackTraversal = function (filePath) {
        if (this.listeners) {
            for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener === null || listener === void 0 ? void 0 : listener.invoke(filePath);
            }
        }
    };
    TraversalWorkspace.prototype.registerCallback = function (callback) {
        if (callback) {
            this.listeners.push(callback);
        }
    };
    TraversalWorkspace.prototype.traversalPath = function (startDir) {
        this.__traversal(startDir, this.__callbackTraversal.bind(this));
    };
    return TraversalWorkspace;
}());
exports.TraversalWorkspace = TraversalWorkspace;
//# sourceMappingURL=TraversalWorkspace.js.map