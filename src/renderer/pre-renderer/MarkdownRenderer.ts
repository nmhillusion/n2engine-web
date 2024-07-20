import * as markdownit from "markdown-it";
import * as fs from "fs";
import hljs from "highlight.js";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";
import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import { FileSystemHelper } from "../../helper/FileSystemHelper";
import path = require("path");

export class MarkdownRenderer extends Renderable {
  private readonly HIGHLIGHT_CSS_FILE_NAME = "markdown.highlight.css";

  private readonly USING_HIGHLIGHT_JS_STORE: Set<string> = new Set<string>();

  constructor(traversal: TraversalWorkspace, engineState: BullEngineState) {
    super(traversal, engineState);
  }

  private prepareHighlightCssFile(
    filePath: string,
    rootDir: string,
    outDir: string
  ): string {
    const highlightCssTargetFilePath = path.join(
      path.dirname(filePath),
      this.HIGHLIGHT_CSS_FILE_NAME
    );

    if (!fs.existsSync(highlightCssTargetFilePath)) {
      const highlightCssPath = path.resolve(
        "node_modules/highlight.js/styles/github.css"
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

    return path.relative(path.dirname(filePath), highlightCssTargetFilePath);
  }

  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ): Promise<void> {
    if (!filePath.endsWith(".md")) {
      return;
    }

    this.logger.info(filePath);

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

      const highlightCssHref = this.prepareHighlightCssFile(
        filePath,
        rootDir,
        outDir
      );

      outContentWithHighlightCssAndHTML = `<link rel="stylesheet" href="${highlightCssHref}">${renderedContent}`;
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
