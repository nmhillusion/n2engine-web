import { RenderConfig } from "../model";
import { TraversalCallback } from "../model/TraversalCallback";
export declare class TraversalWorkspace {
    private listeners;
    private renderConfig_;
    private DEFAULT_MIN_INTERVAL;
    private logger;
    private filesMonitor;
    constructor();
    set renderConfig(config: RenderConfig);
    private __traversal;
    private findFileMonitorOfFile;
    private getAbleToTriggerFileWatch;
    private handleFileWatch;
    private __callbackTraversal;
    registerCallback(callback: TraversalCallback): void;
    traversalPath(startDir: string): void;
}
//# sourceMappingURL=TraversalWorkspace.d.ts.map