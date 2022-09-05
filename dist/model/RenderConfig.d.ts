import { Options } from "sass";
import * as pug from "pug";
export interface RenderConfig {
    rootDir: string;
    outDir: string;
    watch?: {
        enabled: boolean;
        config?: {
            /**
             * default: `1000ms`
             */
            minIntervalInMs?: number;
            /**
             * default: `true`
             */
            handleRenameEvent?: boolean;
            /**
             * default: `true`
             */
            handleChangeEvent?: boolean;
        };
    };
    pug: {
        enabled: boolean;
        config?: pug.Options & pug.LocalsObject;
    };
    scss: {
        enabled: boolean;
        config?: Options<"sync">;
    };
    typescript: {
        enabled: boolean;
        config?: object;
    };
    copyResource: {
        enabled: boolean;
        config?: {
            extsToCopy?: string[];
        };
    };
    rewriteJavascript?: {
        enabled?: boolean;
        config?: {
            rewriteImport?: boolean;
            compress?: boolean;
        };
    };
}
//# sourceMappingURL=RenderConfig.d.ts.map