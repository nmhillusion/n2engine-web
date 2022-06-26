import { Renderable } from "../Renderable";
import { RenderConfig } from "../../model";
export declare class TypeScriptRenderer extends Renderable {
    private readonly userTsConfigPath;
    private readonly userBaseTsConfigPath;
    private readUserTsConfigFile;
    private writeUserTsConfigFile;
    protected doRender(filePath: string, rootDir: string, outDir: string, renderConfig: RenderConfig): Promise<void>;
}
//# sourceMappingURL=TypeScriptRenderer.d.ts.map