import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model";

export abstract class Renderable {
  constructor(private traversaler: TraversalWorkspace) {}

  public registerRender(
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ): void {
    const self = this;
    this.traversaler.registerCallback({
      invoke(filePath: string) {
        self.doRender(filePath, rootDir, outDir, renderConfig);
      },
    });
  }

  protected abstract doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  );
}
