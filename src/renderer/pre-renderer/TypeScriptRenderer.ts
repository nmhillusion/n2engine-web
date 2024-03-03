import * as fs from "fs";
import * as shelljs from "shelljs";
import { CompilerOptions } from "typescript";

import { WORKSPACE_DIR } from "../../index";
import { RenderConfig } from "../../model";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import {
  LogFactory,
  LogLevel,
  LoggerConfig,
  NodeLogger,
} from "@nmhillusion/n2log4web";
import path = require("path");
import { Renderable } from "../Renderable";

export class TypeScriptRenderer extends Renderable {
  private readonly userTsConfigPath: string =
    WORKSPACE_DIR + "/user.tsconfig.json";
  private readonly userBaseTsConfigPath: string =
    WORKSPACE_DIR + "/user.base.tsconfig.json";

  private ableToExecution = true;

  private tsConfig: {
    files: string[];
    include: string[];
    exclude: string[];
    compilerOptions: CompilerOptions;
  };

  constructor(traversal: TraversalWorkspace) {
    super(traversal);
    const npxWhich = shelljs.which("npx");
    if (!npxWhich || 0 == String(npxWhich).trim().length) {
      this.logger.error(
        "Required to install command `npx` to use Typescript renderer."
      );

      this.ableToExecution = false;
    }
  }

  private readUserTsConfigFile() {
    return fs.readFileSync(this.userBaseTsConfigPath).toString();
  }

  private writeUserTsConfigFile(data: string) {
    fs.writeFileSync(this.userTsConfigPath, data);
  }

  private initForTsConfig(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
    if (!this.ableToExecution) {
      throw Error("Unable to execute typescript due to missing npx command");
    }

    this.tsConfig = JSON.parse(this.readUserTsConfigFile());

    if (renderConfig?.typescript?.config) {
      const userTsConfig = renderConfig?.typescript?.config;

      if (renderConfig?.typescript?.overwriteAllConfig) {
        this.tsConfig.compilerOptions = renderConfig?.typescript?.config;
      } else {
        for (const configKey of Object.keys(userTsConfig)) {
          this.tsConfig.compilerOptions[configKey] = userTsConfig[configKey];
        }
      }
    }

    this.tsConfig.include = [`${path.posix.join(rootDir, "**", "*")}`];
    this.tsConfig.compilerOptions.rootDir = rootDir;
    this.tsConfig.compilerOptions.outDir = outDir;

    if (!this.tsConfig.files || 0 == this.tsConfig.files.length) {
      delete this.tsConfig.files;
    }
    this.writeUserTsConfigFile(JSON.stringify(this.tsConfig));
  }

  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ): Promise<void> {
    if (!this.tsConfig) {
      this.initForTsConfig(filePath, rootDir, outDir, renderConfig);
    }

    const command_ = `npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json`;
    this.logger.info("ts command: ", command_);

    const { code, stderr, stdout } = shelljs.exec(command_, {
      async: false,
    });

    this.logger.debug({ code, stderr, stdout });
  }
}
