import { Renderable } from "./Renderable";
import { RenderConfig } from "../model";
export declare class RewriteJavascriptRenderer extends Renderable {
    private readonly IMPORT_MODULE_PATTERN;
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): void;
    private jsRewriteImportFile;
}
//# sourceMappingURL=RewriteJavascriptRenderer.d.ts.map