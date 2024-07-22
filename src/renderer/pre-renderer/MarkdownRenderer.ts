import * as fs from "fs";
import hljs from "highlight.js";
import * as markdownit from "markdown-it";
import * as path from "path";
import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";

export class MarkdownRenderer extends Renderable {
  private readonly HIGHLIGHT_CSS_FILE_NAME = "markdown.highlight.css";

  private readonly USING_HIGHLIGHT_JS_STORE: Set<string> = new Set<string>();

  constructor(
    traversal: TraversalWorkspace,
    engineState: BullEngineState,
    renderConfig: RenderConfig
  ) {
    super(traversal, engineState, renderConfig);
  }

  private prepareHighlightCssFile(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    const highlightCssTargetFilePath = path.join(
      path.dirname(filePath),
      this.HIGHLIGHT_CSS_FILE_NAME
    );

    const highlightStyleName =
      renderConfig.markdown?.highlightStyleName ?? "github";

    if (!fs.existsSync(highlightCssTargetFilePath)) {
      const highlightCssPath = path.resolve(
        `node_modules/highlight.js/styles/${highlightStyleName}.min.css`
      );

      if (fs.existsSync(highlightCssPath)) {
        const highlightCss = fs.readFileSync(highlightCssPath).toString();

        FileSystemHelper.writeOutFile({
          data: highlightCss,
          outDir,
          rootDir,
          sourceFilePath: highlightCssTargetFilePath,
          outExtension: ".css",
        });

        this.logger.info(`saved ${this.HIGHLIGHT_CSS_FILE_NAME}`);
      }
    }

    return {
      cssFilePath: path.relative(
        path.dirname(filePath),
        highlightCssTargetFilePath
      ),
      highlightStyleName,
      isDarkMode: !!highlightStyleName.match(/-dark-?/),
    };
  }

  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string
  ): Promise<void> {
    if (!filePath.endsWith(".md")) {
      return;
    }

    this.logger.info(filePath);
    const renderConfig = this.renderConfig;

    const config_: markdownit.Options = Object.assign(
      {},
      {
        html: true,
        linkify: true,
        typographer: true,
        langPrefix: "language-",
        breaks: true,
        xhtmlOut: true,
        highlight: (str: string, lang: string) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              this.USING_HIGHLIGHT_JS_STORE.add(filePath);

              return hljs.highlight(str, {
                language: lang,
                ignoreIllegals: true,
              }).value;
            } catch (err) {
              this.logger.error(err);
            }
          }

          return ""; // use external default escaping
        },
      },
      renderConfig.markdown.config
    );

    this.logger.info("config: ", config_);

    const mdProcesser = markdownit(config_);

    const renderedContent = mdProcesser.render(
      fs.readFileSync(filePath).toString()
    );

    let outContentWithHighlightCssAndHTML = renderedContent;
    if (this.USING_HIGHLIGHT_JS_STORE.has(filePath)) {
      this.logger.info("highlight js: ", filePath);

      const highlightCssInfo = this.prepareHighlightCssFile(
        filePath,
        rootDir,
        outDir,
        renderConfig
      );

      const isDarkMode = highlightCssInfo.isDarkMode;

      outContentWithHighlightCssAndHTML = `
      <link rel="stylesheet" type="text/css" class="markdown-highlight" href="${
        highlightCssInfo.cssFilePath
      }">
      <style>
        pre:has(code[class*="language-"]) {
          padding: 1em;
          background-color: ${isDarkMode ? "#333" : "#eee"};
          color: ${isDarkMode ? "#ccc" : "#333"};
          border-radius: 0.25em;
        }
      </style>

      ${renderedContent}
      
      `;
    }

    FileSystemHelper.writeOutFile({
      data: outContentWithHighlightCssAndHTML,
      outDir,
      rootDir,
      sourceFilePath: filePath,
      outExtension: ".html",
    });
  }
}
