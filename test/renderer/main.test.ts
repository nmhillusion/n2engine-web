import { Renderer } from "../../src/renderer/main";

new Renderer()
  .config({
    rootDir: __dirname + "/../../sample",
    outDir: __dirname + "/../../sampleDist",
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
  .render();
