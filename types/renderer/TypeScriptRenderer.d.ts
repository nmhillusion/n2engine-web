import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "./TraversalWorkspace";
export declare class TypeScriptRenderer extends Renderable {
    private readonly userTsConfigPath;
    private readonly userBaseTsConfigPath;
    constructor(traversaler: TraversalWorkspace);
    private readUserTsConfigFile;
    private writeUserTsConfigFile;
    protected doRender(filePath: string, rootDir: string, outDir: string): void;
}
//# sourceMappingURL=TypeScriptRenderer.d.ts.map