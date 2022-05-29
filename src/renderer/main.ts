import { RenderConfig } from "../model/RenderConfig";
import { InjectVariableRenderer } from "./InjectVariableRenderer";
import { PugRenderer } from "./PugRenderer";
import { Renderable } from "./Renderable";
import { ScssRenderer } from "./ScssRenderer";
import { TraversalWorkspace } from "./TraversalWorkspace";
import { TypeScriptRenderer } from "./TypeScriptRenderer";

export class N2EngineRenderer {
  private readonly traversalerRootDir: TraversalWorkspace;
  private readonly traversalerOutDir: TraversalWorkspace;
  private renderConfig: RenderConfig;
  private __variableFilePathToInject: string;

  constructor() {
    this.traversalerRootDir = new TraversalWorkspace();
    this.traversalerOutDir = new TraversalWorkspace();
  }

  public config(renderConfig: RenderConfig): N2EngineRenderer {
    if (renderConfig) {
      this.renderConfig = renderConfig;
    }
    return this;
  }

  public setVariableFilePathToInject(path: string): N2EngineRenderer {
    if (path) {
      this.__variableFilePathToInject = path;
    }
    return this;
  }

  private registerForRenderer(renderer: Renderable) {
    renderer?.registerRender(
      this.renderConfig.rootDir,
      this.renderConfig.outDir
    );
  }

  render() {
    if (!this.renderConfig) {
      console.error("Does not exist config to run rendering");
      return;
    }

    if (!!this.__variableFilePathToInject) {
      this.registerForRenderer(
        new InjectVariableRenderer(
          this.__variableFilePathToInject,
          this.traversalerOutDir
        )
      );
    }
    if (this.renderConfig.pug.enabled) {
      this.registerForRenderer(new PugRenderer(this.traversalerRootDir));
    }
    if (this.renderConfig.scss.enabled) {
      this.registerForRenderer(new ScssRenderer(this.traversalerRootDir));
    }
    if (this.renderConfig.typescript.enabled) {
      this.registerForRenderer(new TypeScriptRenderer(this.traversalerRootDir));
    }

    this.traversalerRootDir.traversalPath(this.renderConfig.rootDir);
    this.traversalerOutDir.traversalPath(this.renderConfig.outDir);
  }
}
