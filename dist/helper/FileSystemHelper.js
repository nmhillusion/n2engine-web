"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemHelper = void 0;
const fs = require("fs");
class FileSystemHelper {
    static getFileNameFromPath(path, ignoreExt = true) {
        {
            const slashIndex = path.lastIndexOf("/");
            if (-1 < slashIndex && slashIndex < path.length - 1) {
                path = path.substring(slashIndex + 1);
            }
        }
        {
            const dotIndex = path.lastIndexOf(".");
            if (0 < dotIndex && ignoreExt) {
                path = path.substring(0, dotIndex);
            }
        }
        return path;
    }
    static getDirFromPath(path) {
        const fileState = fs.lstatSync(path);
        if (fileState.isFile()) {
            const slashIndex = path.lastIndexOf("/");
            if (-1 < slashIndex && slashIndex < path.length - 1) {
                path = path.substring(0, slashIndex);
            }
        }
        return path;
    }
    static writeOutFile({ data, sourceFilePath, rootDir, outDir, outExtension = ".dat", }) {
        const outFileName = FileSystemHelper.getFileNameFromPath(sourceFilePath);
        const inputFileDir = FileSystemHelper.getDirFromPath(sourceFilePath);
        const outFileDir = inputFileDir.replace(rootDir, outDir);
        const fullOutFilePath = outFileDir + "/" + outFileName + outExtension;
        fs.mkdirSync(outFileDir, { recursive: true });
        fs.writeFileSync(fullOutFilePath, data, {
            mode: 0o666,
        });
    }
    static copyFile({ sourceFilePath, rootDir, outDir, }) {
        const outFileName = FileSystemHelper.getFileNameFromPath(sourceFilePath, false);
        const inputFileDir = FileSystemHelper.getDirFromPath(sourceFilePath);
        const outFileDir = inputFileDir.replace(rootDir, outDir);
        const fullOutFilePath = outFileDir + "/" + outFileName;
        if (!fs.existsSync(outFileDir)) {
            fs.mkdirSync(outFileDir, { recursive: true });
        }
        fs.copyFileSync(sourceFilePath, fullOutFilePath);
    }
}
exports.FileSystemHelper = FileSystemHelper;
//# sourceMappingURL=FileSystemHelper.js.map