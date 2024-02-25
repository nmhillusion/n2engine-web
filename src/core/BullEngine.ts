import { RenderConfig } from "../model/RenderConfig";
import { TraversalWorkspace } from "./TraversalWorkspace";
import {
  Renderable,
  CopyResourceRenderer,
  RewriteJavascriptRenderer,
  PugRenderer,
  ScssRenderer,
  TypeScriptRenderer,
  InjectVariableRenderer,
} from "../renderer";

export class BullEngine {
  private readonly traversalerRootDir: TraversalWorkspace;
  private readonly traversalerOutDir: TraversalWorkspace;
  private renderConfig: RenderConfig;
  private variableFilePathToInject_: string;

  constructor() {
    this.traversalerRootDir = new TraversalWorkspace();
    this.traversalerOutDir = new TraversalWorkspace();
  }

  public config(renderConfig: RenderConfig): BullEngine {
    if (renderConfig) {
      this.renderConfig =
        this.traversalerRootDir.renderConfig =
        this.traversalerOutDir.renderConfig =
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
      this.registerForRenderer(new PugRenderer(this.traversalerRootDir));
    }
    if (this.renderConfig.scss.enabled) {
      this.registerForRenderer(new ScssRenderer(this.traversalerRootDir));
    }
    if (this.renderConfig.typescript.enabled) {
      // this.registerForRenderer(new TypeScriptRenderer(this.traversalerRootDir));
      new TypeScriptRenderer({
        rootDir: this.renderConfig.rootDir,
        outDir: this.renderConfig.outDir,
        renderConfig: this.renderConfig,
      }).render();
    }
    if (this.renderConfig.copyResource.enabled) {
      this.registerForRenderer(
        new CopyResourceRenderer(this.traversalerRootDir)
      );
    }
    if (!!this.variableFilePathToInject_) {
      this.registerForRenderer(
        new InjectVariableRenderer(
          this.variableFilePathToInject_,
          this.traversalerOutDir
        )
      );
    }
    if (this.renderConfig.rewriteJavascript?.enabled) {
      this.registerForRenderer(
        new RewriteJavascriptRenderer(this.traversalerOutDir)
      );
    }

    await this.traversalerRootDir.traversalPath(this.renderConfig.rootDir);
    await this.traversalerOutDir.traversalPath(this.renderConfig.outDir);
  }
}
