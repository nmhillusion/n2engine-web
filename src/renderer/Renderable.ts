import { LogFactory, LoggerConfig, LOG_LEVELS, NodeLogger } from "n2log4web";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model";

export abstract class Renderable {
  protected logger: NodeLogger;

  constructor(private traversaler: TraversalWorkspace) {
    this.logger = LogFactory.fromConfig(
      new LoggerConfig().setLoggableLevel(LOG_LEVELS.DEBUG)
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
