import * as fs from "fs";
import { Renderer } from "../../src/renderer/main";

new Renderer()
  .config({
    rootDir: fs.realpathSync(__dirname + "/../../sample"),
    outDir: fs.realpathSync(__dirname + "/../../sampleDist"),
    pug: {
      enabled: true,
    },
    scss: {
      enabled: true,
    },
    typescript: {
      enabled: true,
    },
  })
  .setVariableFilePathToInject(
    fs.realpathSync(__dirname + "/../env/dev.env.json")
  )
  .render();
