import { SyncOptions } from "node-sass";
import * as pug from "pug";
export interface RenderConfig {
    rootDir: string;
    outDir: string;
    pug: {
        enabled: boolean;
        config?: pug.Options & pug.LocalsObject;
    };
    scss: {
        enabled: boolean;
        config?: SyncOptions;
    };
    typescript: {
        enabled: boolean;
        config?: Object;
    };
}
//# sourceMappingURL=RenderConfig.d.ts.map