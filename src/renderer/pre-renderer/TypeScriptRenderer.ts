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

export class TypeScriptRenderer {
  private readonly userTsConfigPath: string =
    WORKSPACE_DIR + "/user.tsconfig.json";
  private readonly userBaseTsConfigPath: string =
    WORKSPACE_DIR + "/user.base.tsconfig.json";
  private logger: NodeLogger = null;

  private ableToExecution = true;

  constructor(
    private config: {
      rootDir: string;
      outDir: string;
      renderConfig: RenderConfig;
    }
  ) {
    this.logger = LogFactory.fromConfig(
      new LoggerConfig().setLoggableLevel(LogLevel.DEBUG)
    ).getNodeLog(this.constructor.name);

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

  async render() {
    const tsConfig: {
      files: string[];
      include: string[];
      exclude: string[];
      compilerOptions: CompilerOptions;
    } = JSON.parse(this.readUserTsConfigFile());

    if (this.config.renderConfig?.typescript?.config) {
      const userTsConfig = this.config.renderConfig?.typescript?.config;

      if (this.config.renderConfig?.typescript?.overwriteAllConfig) {
        tsConfig.compilerOptions = this.config.renderConfig?.typescript?.config;
      } else {
        for (const configKey of Object.keys(userTsConfig)) {
          tsConfig.compilerOptions[configKey] = userTsConfig[configKey];
        }
      }
    }

    tsConfig.include = [`${path.posix.join(this.config.rootDir, "**", "*")}`];
    tsConfig.compilerOptions.rootDir = this.config.rootDir;
    tsConfig.compilerOptions.outDir = this.config.outDir;

    const watchConfigCmd = this.config.renderConfig.watch?.enabled
      ? "--watch"
      : "";

    if (!tsConfig.files || 0 == tsConfig.files.length) {
      delete tsConfig.files;
    }
    this.writeUserTsConfigFile(JSON.stringify(tsConfig));

    const command_ = `npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json ${watchConfigCmd}`;
    this.logger.info("ts command: ", command_);

    const { code, stderr, stdout } = shelljs.exec(command_, {
      async: false,
    });

    this.logger.debug({ code, stderr, stdout });
  }
}
