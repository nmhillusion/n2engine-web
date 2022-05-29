import * as fs from "fs";
import { N2EngineRenderer } from "../../src/renderer/main";

test("test renderer", function () {
  expect(() =>
    new N2EngineRenderer()
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
      .render()
  ).not.toThrowError();
});
