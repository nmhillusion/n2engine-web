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
    private engineState: BullEngineState
  ) {
    this.logger = LogFactory.fromConfig(
      new LoggerConfig().setLoggableLevel(LogLevel.DEBUG)
    ).getNodeLog(this.constructor.name);
  }

  public registerRender(
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ): void {
    const self = this;
    this.traversaler.registerCallback({
      invoke(filePath: string) {
        return self.doRender(filePath, rootDir, outDir, renderConfig);
      },
    });
  }

  protected abstract doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ): Promise<void>;
}
