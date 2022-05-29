import { TraversalWorkspace } from "./TraversalWorkspace";

export abstract class Renderable {
  constructor(private traversaler: TraversalWorkspace) {}

  public registerRender(
    rootDir: string,
    outDir: string,
    baseDir: string
  ): void {
    const self = this;
    this.traversaler.registerCallback({
      invoke(filePath: string) {
        self.doRender(filePath, rootDir, outDir, baseDir);
      },
    });
  }

  protected abstract doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    baseDir: string
  );
}
