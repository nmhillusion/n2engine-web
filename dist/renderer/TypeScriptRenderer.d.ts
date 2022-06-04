import { Renderable } from "./Renderable";
export declare class TypeScriptRenderer extends Renderable {
    private readonly userTsConfigPath;
    private readonly userBaseTsConfigPath;
    private readUserTsConfigFile;
    private writeUserTsConfigFile;
    protected doRender(filePath: string, rootDir: string, outDir: string): void;
}
//# sourceMappingURL=TypeScriptRenderer.d.ts.map