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
exports.TraversalWorkspace = void 0;
const fs = require("fs");
const n2log4web_1 = require("n2log4web");
class TraversalWorkspace {
    constructor() {
        this.listeners = [];
        this.DEFAULT_MIN_INTERVAL = 1000;
        this.filesMonitor = [];
        this.logger = n2log4web_1.LogFactory.fromConfig(new n2log4web_1.LoggerConfig()
            .setFocusType("color")
            .setLoggableLevel(n2log4web_1.LOG_LEVELS.DEBUG)).getNodeLog(this.constructor.name);
    }
    set renderConfig(config) {
        this.renderConfig_ = config;
    }
    __traversal(startDir, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirList = fs.readdirSync(startDir);
            for (const pItem of dirList) {
                const pItemPath = `${startDir}/${pItem}`;
                const itemState = fs.lstatSync(pItemPath);
                if (itemState.isDirectory()) {
                    yield this.__traversal(pItemPath, callback);
                }
                else if (itemState.isFile()) {
                    yield callback(pItemPath);
                    this.handleFileWatch(pItemPath, callback);
                }
            }
        });
    }
    findFileMonitorOfFile(filePath) {
        return this.filesMonitor.find((fm) => fm.filePath === filePath);
    }
    ableToTriggerFileWatch(filePath) {
        var _a, _b;
        const fileMonitor = this.findFileMonitorOfFile(filePath);
        const currentTime = new Date().getTime();
        if (fileMonitor) {
            const deltaTime = currentTime - fileMonitor.latestModifiedTime;
            const MIN_INTERVAL = ((_b = (_a = this.renderConfig_) === null || _a === void 0 ? void 0 : _a.watch) === null || _b === void 0 ? void 0 : _b.minIntervalInMs) || this.DEFAULT_MIN_INTERVAL;
            if (Number.isNaN(deltaTime) || deltaTime < MIN_INTERVAL) {
                return false;
            }
            else {
                fileMonitor.latestModifiedTime = currentTime;
                return true;
            }
        }
        else {
            this.filesMonitor.push({
                filePath,
                latestModifiedTime: currentTime,
            });
            return true;
        }
    }
    handleFileWatch(pItemPath, callback) {
        var _a, _b, _c, _d, _e, _f;
        console.log("watcher enabled? ", (_b = (_a = this.renderConfig_) === null || _a === void 0 ? void 0 : _a.watch) === null || _b === void 0 ? void 0 : _b.enabled);
        if ((_d = (_c = this.renderConfig_) === null || _c === void 0 ? void 0 : _c.watch) === null || _d === void 0 ? void 0 : _d.enabled) {
            console.log("START WATCHER");
            const MIN_INTERVAL = ((_f = (_e = this.renderConfig_) === null || _e === void 0 ? void 0 : _e.watch) === null || _f === void 0 ? void 0 : _f.minIntervalInMs) || this.DEFAULT_MIN_INTERVAL;
            const watcher = fs.watch(pItemPath, {
                persistent: true,
                recursive: false,
            }, (eventType, filename) => {
                var _a, _b, _c, _d;
                if (this.ableToTriggerFileWatch(pItemPath)) {
                    this.logger.info("change file on: ", {
                        pItemPath,
                        eventType,
                        filename,
                    });
                    if (("change" === eventType &&
                        ((_b = (_a = this.renderConfig_) === null || _a === void 0 ? void 0 : _a.watch) === null || _b === void 0 ? void 0 : _b.handleChangeEvent)) ||
                        ("rename" === eventType &&
                            ((_d = (_c = this.renderConfig_) === null || _c === void 0 ? void 0 : _c.watch) === null || _d === void 0 ? void 0 : _d.handleRenameEvent))) {
                        watcher.close();
                        callback(pItemPath);
                        const timer = setTimeout(() => {
                            this.handleFileWatch(pItemPath, callback);
                            clearTimeout(timer);
                        }, MIN_INTERVAL);
                    }
                }
            });
        }
    }
    __callbackTraversal(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.listeners) {
                for (const listener of this.listeners) {
                    yield (listener === null || listener === void 0 ? void 0 : listener.invoke(filePath));
                }
            }
        });
    }
    registerCallback(callback) {
        if (callback) {
            this.listeners.push(callback);
        }
    }
    traversalPath(startDir) {
        return this.__traversal(startDir, this.__callbackTraversal.bind(this));
    }
}
exports.TraversalWorkspace = TraversalWorkspace;
//# sourceMappingURL=TraversalWorkspace.js.map