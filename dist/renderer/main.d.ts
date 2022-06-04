import { RenderConfig } from "../model/RenderConfig";
export declare class N2EngineRenderer {
    private readonly traversalerRootDir;
    private readonly traversalerOutDir;
    private renderConfig;
    private __variableFilePathToInject;
    constructor();
    config(renderConfig: RenderConfig): N2EngineRenderer;
    setVariableFilePathToInject(path: string): N2EngineRenderer;
    private registerForRenderer;
    render(): void;
}
//# sourceMappingURL=main.d.ts.map