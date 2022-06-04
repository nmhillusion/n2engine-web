import { TraversalWorkspace } from "../core/TraversalWorkspace";
export declare abstract class Renderable {
    private traversaler;
    constructor(traversaler: TraversalWorkspace);
    registerRender(rootDir: string, outDir: string): void;
    protected abstract doRender(filePath: string, rootDir: string, outDir: string): any;
}
//# sourceMappingURL=Renderable.d.ts.map