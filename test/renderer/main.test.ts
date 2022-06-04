import * as fs from "fs";
import { BullEngine } from "../../src/core/BullEngine";

test("test renderer", function () {
  const rootDir = __dirname + "/../../sample";
  const outDir = __dirname + "/../../sampleDist";

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir, { recursive: true });
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  expect(() =>
    new BullEngine()
      .config({
        rootDir: fs.realpathSync(rootDir),
        outDir: fs.realpathSync(outDir),
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
