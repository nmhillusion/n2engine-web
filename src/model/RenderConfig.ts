import { Options } from "sass";
import * as pug from "pug";
import { CompilerOptions } from "typescript";
import * as markdownit from "markdown-it";
import { AVAILABLE_HIGHLIGHT_STYLE_NAMES } from "./highlight-style-names";

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
  markdown: {
    enabled: boolean;
    config?: markdownit.Options;
    /**
     * default: `github`
     */
    highlightStyleName?: AVAILABLE_HIGHLIGHT_STYLE_NAMES;
  };
  scss: {
    enabled: boolean;
    config?: Options<"sync">;
  };
  typescript: {
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
