import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "../core/TraversalWorkspace";
export declare class InjectVariableRenderer extends Renderable {
    private variables;
    private readonly PATTERN__VARIABLE_REPLACEMENT;
    constructor(variableFilePathToInject: string, traversaler: TraversalWorkspace);
    private loadVariableFromFile;
    private obtainValueOfVariable;
    protected doRender(filePath: string, rootDir: string, outDir: string): void;
}
//# sourceMappingURL=InjectVariableRenderer.d.ts.map