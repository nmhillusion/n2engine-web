import * as pug from "pug";
import { RenderConfig } from "../model";

export class PugRenderHelper {
  public static combineConfig(renderConfig: RenderConfig) {
    const selfConfig_: pug.Options = {
      pretty: true,
    };

    if (renderConfig?.pug?.config) {
      Object.assign(selfConfig_, renderConfig.pug.config);
    }

    return selfConfig_;
  }
}
