import { RenderConfig } from "model/RenderConfig";
export declare class Renderer {
    private readonly traversaler;
    private renderConfig;
    constructor();
    config(renderConfig: RenderConfig): Renderer;
    private registerForRenderer;
    render(): void;
}
