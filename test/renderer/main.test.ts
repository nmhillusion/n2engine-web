import { Renderer } from "../../src/renderer/main";

new Renderer()
  .config({
    rootDir: "../../sample",
    outDir: "../../sampleDist",
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
