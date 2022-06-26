import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";
export declare class PugRenderer extends Renderable {
    private readonly PATTERN__LINK_SCSS;
    private readonly PATTERN__LINK_TS;
    private renameForImportScss;
    private renameForImportTs;
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): Promise<void>;
}
//# sourceMappingURL=PugRenderer.d.ts.map