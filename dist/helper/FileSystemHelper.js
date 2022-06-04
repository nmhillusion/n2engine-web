"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemHelper = void 0;
var fs = require("fs");
var FileSystemHelper = /** @class */ (function () {
    function FileSystemHelper() {
    }
    FileSystemHelper.getFileNameFromPath = function (path) {
        {
            var slashIndex = path.lastIndexOf("/");
            if (-1 < slashIndex && slashIndex < path.length - 1) {
                path = path.substring(slashIndex + 1);
            }
        }
        {
            var dotIndex = path.lastIndexOf(".");
            if (0 < dotIndex) {
                path = path.substring(0, dotIndex);
            }
        }
        return path;
    };
    FileSystemHelper.getDirFromPath = function (path) {
        var fileState = fs.lstatSync(path);
        if (fileState.isFile()) {
            var slashIndex = path.lastIndexOf("/");
            if (-1 < slashIndex && slashIndex < path.length - 1) {
                path = path.substring(0, slashIndex);
            }
        }
        return path;
    };
    FileSystemHelper.writeOutFile = function (_a) {
        var data = _a.data, sourceFilePath = _a.sourceFilePath, rootDir = _a.rootDir, outDir = _a.outDir, _b = _a.outExtension, outExtension = _b === void 0 ? ".dat" : _b;
        var outFileName = FileSystemHelper.getFileNameFromPath(sourceFilePath);
        var inputFileDir = FileSystemHelper.getDirFromPath(sourceFilePath);
        var outFileDir = inputFileDir.replace(rootDir, outDir);
        var fullOutFilePath = outFileDir + "/" + outFileName + outExtension;
        fs.mkdirSync(outFileDir, { recursive: true });
        fs.writeFileSync(fullOutFilePath, data, {
            mode: 438,
        });
    };
    return FileSystemHelper;
}());
exports.FileSystemHelper = FileSystemHelper;
//# sourceMappingURL=FileSystemHelper.js.map