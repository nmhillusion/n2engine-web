import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model/RenderConfig";
import { Renderable } from "./Renderable";
export declare class ScssRenderer extends Renderable {
    constructor(traversaller: TraversalWorkspace);
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): void;
}
//# sourceMappingURL=ScssRenderer.d.ts.map