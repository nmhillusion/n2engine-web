import { RenderConfig } from "model/RenderConfig";
import { PugRenderer } from "./PugRenderer";
import { Renderable } from "./Renderable";
import { ScssRenderer } from "./ScssRenderer";
import { TraversalWorkspace } from "./TraversalWorkspace";
import { TypeScriptRenderer } from "./TypeScriptRenderer";

export class Renderer {
  private readonly traversaler: TraversalWorkspace;
  private renderConfig: RenderConfig;

  constructor() {
    this.traversaler = new TraversalWorkspace();
  }

  public config(renderConfig: RenderConfig): Renderer {
    if (renderConfig) {
      this.renderConfig = renderConfig;
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

    if (this.renderConfig.pug.enabled) {
      this.registerForRenderer(new PugRenderer(this.traversaler));
    }
    if (this.renderConfig.scss.enabled) {
      this.registerForRenderer(new ScssRenderer(this.traversaler));
    }
    if (this.renderConfig.typescript.enabled) {
      this.registerForRenderer(new TypeScriptRenderer(this.traversaler));
    }

    this.traversaler.traversalPath(this.renderConfig.rootDir);
  }
}
