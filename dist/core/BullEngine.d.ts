import { RenderConfig } from "../model/RenderConfig";
export declare class BullEngine {
    private readonly traversalerRootDir;
    private readonly traversalerOutDir;
    private renderConfig;
    private __variableFilePathToInject;
    constructor();
    config(renderConfig: RenderConfig): BullEngine;
    setVariableFilePathToInject(path: string): BullEngine;
    private registerForRenderer;
    render(): void;
}
//# sourceMappingURL=BullEngine.d.ts.map