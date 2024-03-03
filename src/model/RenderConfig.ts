import { Options } from "sass";
import * as pug from "pug";
import { CompilerOptions } from "typescript";

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
    /**
     * default: 5000ms
     */
    delayForEachRuntimeInMillis?: number;
    enabled: boolean;
    /**
     * default `true`
     */
    overwriteAllConfig?: boolean;
    config?: CompilerOptions;
  };
  copyResource: {
    enabled: boolean;
    config?: {
      /**
       * default of extsToCopy: [".jpg", ".jpeg", ".png", ".gif", ".ico", ".woff", ".ttf"]
       */
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
