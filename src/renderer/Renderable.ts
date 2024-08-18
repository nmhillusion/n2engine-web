import * as path from "path";
import {
  LogFactory,
  LoggerConfig,
  NodeLogger,
  LogLevel,
} from "@nmhillusion/n2log4web";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model";
import { BullEngineState } from "../core";

export abstract class Renderable {
  protected logger: NodeLogger;

  constructor(
    private traversaler: TraversalWorkspace,
    protected engineState: BullEngineState,
    protected renderConfig: RenderConfig
  ) {
    this.logger = LogFactory.fromConfig(
      new LoggerConfig().setLoggableLevel(LogLevel.DEBUG)
    ).getNodeLog(this.constructor.name);
  }

  public registerRender(rootDir: string, outDir: string): void {
    const self = this;
    this.traversaler.registerCallback({
      name: self.constructor.name,
      invoke: (filePath: string) => {
        if (!path.basename(filePath).startsWith("_")) {
          return self.doRender(filePath, rootDir, outDir);
        } else {
          this.logger.warn(
            "Not traversal for internal file (filename start with `_`), skipped: ",
            filePath
          );

          return Promise.resolve();
        }
      },
    });

    this.setupSelfConfig();
  }

  protected abstract setupSelfConfig(): void;

  protected abstract doRender(
    filePath: string,
    rootDir: string,
    outDir: string
  ): Promise<void>;
}
