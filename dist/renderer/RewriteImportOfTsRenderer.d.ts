import { TraversalWorkspace } from "../core/TraversalWorkspace";
import { Renderable } from "./Renderable";
export declare class RewriteImportOfTsRenderer extends Renderable {
    private readonly IMPORT_MODULE_PATTERN;
    constructor(traversaller: TraversalWorkspace);
    protected doRender(filePath: string, rootDir: string, outDir: string): void;
    private jsRewriteImportFile;
}
//# sourceMappingURL=RewriteImportOfTsRenderer.d.ts.map