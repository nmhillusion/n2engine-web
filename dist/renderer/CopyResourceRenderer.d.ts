import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model";
import { Renderable } from "./Renderable";
export declare class CopyResourceRenderer extends Renderable {
    constructor(traversaller: TraversalWorkspace);
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): void;
}
//# sourceMappingURL=CopyResourceRenderer.d.ts.map