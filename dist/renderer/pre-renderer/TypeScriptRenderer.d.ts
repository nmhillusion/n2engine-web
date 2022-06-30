import { Renderable } from "../Renderable";
import { RenderConfig } from "../../model";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
export declare class TypeScriptRenderer extends Renderable {
    private readonly userTsConfigPath;
    private readonly userBaseTsConfigPath;
    private ableToExecution;
    constructor(traversal: TraversalWorkspace);
    private readUserTsConfigFile;
    private writeUserTsConfigFile;
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): Promise<void>;
}
//# sourceMappingURL=TypeScriptRenderer.d.ts.map