import { Renderable } from "./Renderable";
import { RenderConfig } from "../model";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
export declare class TypeScriptRenderer extends Renderable {
    private readonly userTsConfigPath;
    private readonly userBaseTsConfigPath;
    constructor(traversaller: TraversalWorkspace);
    private readUserTsConfigFile;
    private writeUserTsConfigFile;
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): void;
}
//# sourceMappingURL=TypeScriptRenderer.d.ts.map