import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";
export declare class PugRenderer extends Renderable {
    constructor(traversaler: TraversalWorkspace);
    protected doRender(filePath: string, rootDir: string, outDir: string): void;
}
