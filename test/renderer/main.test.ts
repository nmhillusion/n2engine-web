import * as fs from "fs";
import { BullEngine } from "../../src/core/BullEngine";
import { parser } from "@nmhillusion/n2mix";

const isWatching = Boolean(
  parser.cliParamsParser(process.argv).get("watch") ?? false
);

const isTesting = "function" === typeof test;

if (isTesting) {
  test("test renderer", async function () {
    try {
      await expect(exec()).resolves.toBe(true);
      console.log(new Date(), "testing completed!");
    } catch (err) {
      console.error({ err });
    }
  }, 120_000);
} else {
  exec();
}

async function exec(): Promise<boolean> {
  console.log(`-- TESTING: ${isTesting}; WATCHING: ${isWatching} --`);
  try {
    const rootDir = process.cwd() + "/sample";
    const outDir = process.cwd() + "/sampleDist";

    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir, { recursive: true });
    }
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    await new BullEngine()
      .config({
        rootDir: fs.realpathSync(rootDir),
        outDir: fs.realpathSync(outDir),
        watch: {
          enabled: !isTesting && isWatching,
          config: {
            handleRenameEvent: true,
            handleChangeEvent: true,
            minIntervalInMs: 2_000,
          },
        },
        pug: {
          enabled: true,
          config: {
            pretty: false,
          },
        },
        markdown: {
          enabled: true,
        },
        scss: {
          enabled: true,
          config: {
            style: "compressed",
            logger: {
              debug(message, options) {
                console.log("sass compile: ", message);
              },
            },
          },
        },
        typescript: {
          enabled: true,
          overwriteAllConfig: false,
          config: {
            declaration: false,
            declarationMap: false,
            sourceMap: false,
          },
        },
        copyResource: {
          enabled: true,
        },
        rewriteJavascript: {
          enabled: true,
          config: {
            rewriteImport: true,
            compress: true,
          },
        },
      })
      .setVariableFilePathToInject(
        fs.realpathSync(process.cwd() + "/test/env/dev.env.json")
      )
      .render();
    console.log(new Date(), "[finished execution]");
    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
}
