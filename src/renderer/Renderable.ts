import { TraversalWorkspace } from "./TraversalWorkspace";

export abstract class Renderable {
  constructor(private traversaler: TraversalWorkspace) {}

  public registerRender(rootDir: string, outDir: string): void {
    const self = this;
    this.traversaler.registerCallback({
      invoke(filePath: string) {
        self.doRender(filePath, rootDir, outDir);
      },
    });
  }

  protected abstract doRender(
    filePath: string,
    rootDir: string,
    outDir: string
  );
}
