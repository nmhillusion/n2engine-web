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
      invoke(filePath: string) {
        return self.doRender(filePath, rootDir, outDir);
      },
    });
  }

  protected abstract doRender(
    filePath: string,
    rootDir: string,
    outDir: string
  ): Promise<void>;
}
