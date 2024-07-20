import * as markdownit from "markdown-it";

import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";
import { BullEngineState } from "../../core";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";

export class MarkdownRenderer extends Renderable {
  private md = markdownit();

  constructor(traversal: TraversalWorkspace, engineState: BullEngineState) {
    super(traversal, engineState);
  }

  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ): Promise<void> {
    const mdProcesser = markdownit({
      html: true,
      linkify: true,
      typographer: true,
      langPrefix: "language-",
      breaks: true,
      xhtmlOut: true,
    });

    mdProcesser.render("# markdown-it rulezz!");
  }
}
