import * as fs from "fs";
import {
  LogFactory,
  LoggerConfig,
  LogLevel,
  NodeLogger,
} from "@nmhillusion/n2log4web";
import { RenderConfig } from "../model";
import { TraversalCallback } from "../model/TraversalCallback";

interface FileMonitor {
  filePath: string;
  latestModifiedTime: number;
}

export class TraversalWorkspace {
  private listeners: TraversalCallback[] = [];
  private renderConfig_: RenderConfig;
  private DEFAULT_MIN_INTERVAL: number = 1000;
  private logger: NodeLogger;
  private filesMonitor: FileMonitor[] = [];

  constructor() {
    this.logger = LogFactory.fromConfig(
      new LoggerConfig().setFocusType("color").setLoggableLevel(LogLevel.DEBUG)
    ).getNodeLog(this.constructor.name);
  }

  public set renderConfig(config: RenderConfig) {
    this.renderConfig_ = config;
  }

  private async __traversal(
    startDir: string,
    callback: (filePath: string) => Promise<void>
  ) {
    const dirList = fs.readdirSync(startDir);

    for (const pItem of dirList) {
      const pItemPath = `${startDir}/${pItem}`;

      const itemState = fs.lstatSync(pItemPath);
      if (itemState.isDirectory()) {
        await this.__traversal(pItemPath, callback);
      } else if (itemState.isFile()) {
        await callback(pItemPath);

        this.handleFileWatch(pItemPath, callback);
      }
    }
  }

  private findFileMonitorOfFile(filePath: string): FileMonitor | undefined {
    return this.filesMonitor.find((fm) => fm.filePath === filePath);
  }

  private ableToTriggerFileWatch(filePath: string) {
    const fileMonitor = this.findFileMonitorOfFile(filePath);
    const currentTime = new Date().getTime();

    if (fileMonitor) {
      const deltaTime = currentTime - fileMonitor.latestModifiedTime;
      const MIN_INTERVAL =
        this.renderConfig_?.watch?.config?.minIntervalInMs ||
        this.DEFAULT_MIN_INTERVAL;

      if (Number.isNaN(deltaTime) || deltaTime < MIN_INTERVAL) {
        return false;
      } else {
        fileMonitor.latestModifiedTime = currentTime;
        return true;
      }
    } else {
      this.filesMonitor.push({
        filePath,
        latestModifiedTime: currentTime,
      });
      return true;
    }
  }

  private handleFileWatch(
    pItemPath: string,
    callback: (filePath: string) => any
  ) {
    if (
      this.renderConfig_?.watch?.enabled &&
      (false !== this.renderConfig_?.watch?.config?.handleChangeEvent ||
        false !== this.renderConfig_?.watch?.config?.handleRenameEvent)
    ) {
      const MIN_INTERVAL =
        this.renderConfig_?.watch?.config?.minIntervalInMs ||
        this.DEFAULT_MIN_INTERVAL;

      const watcher = fs.watch(
        pItemPath,
        {
          persistent: true,
          recursive: false,
        },
        (eventType, filename) => {
          if (this.ableToTriggerFileWatch(pItemPath)) {
            this.logger.info("change file on: ", {
              pItemPath,
              eventType,
              filename,
            });

            if (
              ("change" === eventType &&
                false !==
                  this.renderConfig_?.watch?.config?.handleChangeEvent) ||
              ("rename" === eventType &&
                false !== this.renderConfig_?.watch?.config?.handleRenameEvent)
            ) {
              this.logger.info("running watcher");
              watcher.close();

              callback(pItemPath);

              const timer = setTimeout(() => {
                this.handleFileWatch(pItemPath, callback);

                clearTimeout(timer);
              }, MIN_INTERVAL);
            }
          }
        }
      );
    }
  }

  private async __callbackTraversal(filePath: string) {
    if (this.listeners) {
      for (const listener of this.listeners) {
        await listener?.invoke(filePath);
      }
    }
  }

  public registerCallback(callback: TraversalCallback) {
    if (callback) {
      this.listeners.push(callback);
    }
  }

  public traversalPath(startDir: string): Promise<void> {
    return this.__traversal(startDir, this.__callbackTraversal.bind(this));
  }
}
