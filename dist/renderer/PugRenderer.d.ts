import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { RenderConfig } from "../model";
import { Renderable } from "./Renderable";
export declare class PugRenderer extends Renderable {
    private readonly PATTERN__LINK_SCSS;
    private readonly PATTERN__LINK_TS;
    constructor(traversaller: TraversalWorkspace);
    private renameForImportScss;
    private renameForImportTs;
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): void;
}
//# sourceMappingURL=PugRenderer.d.ts.map