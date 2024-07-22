import * as fs from "fs";
import { CompilerOptions } from "typescript";

import { exec, execSync } from "child_process";
import { TraversalWorkspace } from "../../core/TraversalWorkspace";
import { BullEngineState, WORKSPACE_DIR } from "../../index";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";
import path = require("path");

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

  constructor(
    traversal: TraversalWorkspace,
    engineState: BullEngineState,
    renderConfig: RenderConfig
  ) {
    super(traversal, engineState, renderConfig);
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
    outDir: string
  ): Promise<void> {
    if (!this.tsConfig) {
      const renderConfig = this.renderConfig;

      this.initForTsConfig(filePath, rootDir, outDir, renderConfig);

      const watchStatement = renderConfig.watch?.enabled ? "--watch" : "";

      const command_ = `npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json ${watchStatement}`;
      this.logger.info("ts command: ", command_);

      if (renderConfig.watch?.enabled) {
        const process_ = exec(command_, (error_, stdout_, stderr_) => {
          if (error_) {
            this.logger.error(`exec error: ${error_}`);
            return;
          }
          this.logger.info(`stdout: ${stdout_}`);
          this.logger.error(`stderr: ${stderr_}`);
        });

        this.logger.info("start watching process on PID: ", process_.pid);
      } else {
        const output = execSync(command_).toString();

        this.logger.info("stdout: ", output);
      }
    }
  }
}
