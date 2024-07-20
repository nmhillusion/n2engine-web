import { RenderConfig } from "../model/RenderConfig";
import { TraversalWorkspace } from "./TraversalWorkspace";
import {
  Renderable,
  CopyResourceRenderer,
  RewriteJavascriptRenderer,
  PugRenderer,
  ScssRenderer,
  TypeScriptRenderer,
  MarkdownRenderer,
  InjectVariableRenderer,
} from "../renderer";

export interface BullEngineState {
  latestCompileTsTime?: Date;
}

export class BullEngine {
  private readonly rootDirTraversaler: TraversalWorkspace;
  private readonly outDirTraversaler: TraversalWorkspace;
  private renderConfig: RenderConfig;
  private variableFilePathToInject_: string;

  private readonly STATE: BullEngineState = {};

  constructor() {
    this.rootDirTraversaler = new TraversalWorkspace();
    this.outDirTraversaler = new TraversalWorkspace();
  }

  public config(renderConfig: RenderConfig): BullEngine {
    if (renderConfig) {
      this.renderConfig =
        this.rootDirTraversaler.renderConfig =
        this.outDirTraversaler.renderConfig =
          renderConfig;
    }
    return this;
  }

  public setVariableFilePathToInject(path: string): BullEngine {
    if (path) {
      this.variableFilePathToInject_ = path;
    }
    return this;
  }

  private registerForRenderer(renderer: Renderable) {
    renderer?.registerRender(
      this.renderConfig.rootDir,
      this.renderConfig.outDir,
      this.renderConfig
    );
  }

  public async render() {
    if (!this.renderConfig) {
      console.error("Does not exist config to run rendering");
      return;
    }

    if (this.renderConfig.pug.enabled) {
      this.registerForRenderer(
        new PugRenderer(this.rootDirTraversaler, this.STATE)
      );
    }
    if (this.renderConfig.markdown.enabled) {
      this.registerForRenderer(
        new MarkdownRenderer(this.rootDirTraversaler, this.STATE)
      );
    }
    if (this.renderConfig.scss.enabled) {
      this.registerForRenderer(
        new ScssRenderer(this.rootDirTraversaler, this.STATE)
      );
    }
    if (this.renderConfig.typescript.enabled) {
      this.registerForRenderer(
        new TypeScriptRenderer(this.rootDirTraversaler, this.STATE)
      );
    }
    if (this.renderConfig.copyResource.enabled) {
      this.registerForRenderer(
        new CopyResourceRenderer(this.rootDirTraversaler, this.STATE)
      );
    }
    if (!!this.variableFilePathToInject_) {
      this.registerForRenderer(
        new InjectVariableRenderer(
          this.variableFilePathToInject_,
          this.outDirTraversaler,
          this.STATE
        )
      );
    }
    if (this.renderConfig.rewriteJavascript?.enabled) {
      this.registerForRenderer(
        new RewriteJavascriptRenderer(this.outDirTraversaler, this.STATE)
      );
    }

    await this.rootDirTraversaler.traversalPath(this.renderConfig.rootDir);
    await this.outDirTraversaler.traversalPath(this.renderConfig.outDir);
  }
}
