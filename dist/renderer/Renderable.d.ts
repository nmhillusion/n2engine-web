import { NodeLogger } from "@nmhillusion/n2log4web";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model";
export declare abstract class Renderable {
    private traversaler;
    protected logger: NodeLogger;
    constructor(traversaler: TraversalWorkspace);
    registerRender(rootDir: string, outDir: string, renderConfig: RenderConfig): void;
    protected abstract doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): Promise<void>;
}
//# sourceMappingURL=Renderable.d.ts.map