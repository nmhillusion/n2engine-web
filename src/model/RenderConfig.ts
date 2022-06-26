import { SyncOptions } from "node-sass";
import * as pug from "pug";

export interface RenderConfig {
  rootDir: string;
  outDir: string;
  watch?: boolean;
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
    config?: object;
  };
  copyResource: {
    enabled: boolean;
    extsToCopy?: string[];
  };
  rewriteJavascript?: {
    enabled?: boolean;
    config?: {
      rewriteImport?: boolean;
      compress?: boolean;
    };
  };
}
