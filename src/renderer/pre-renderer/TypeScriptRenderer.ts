import * as fs from "fs";
import { CompilerOptions } from "typescript";

import { exec, execSync } from "child_process";
import { WORKSPACE_DIR } from "../../index";
import { RenderConfig } from "../../model";
import { Renderable } from "../Renderable";
import path = require("path");

export class TypeScriptRenderer extends Renderable {
  private buildCommand_: string;

  private tsConfig: {
    files: string[];
    include: string[];
    exclude: string[];
    compilerOptions: CompilerOptions;
  };

  protected setupSelfConfig(): void {
    const renderConfig = this.renderConfig;

    this.initForTsConfig(
      renderConfig.rootDir,
      renderConfig.outDir,
      renderConfig
    );

    const watchStatement = renderConfig.watch?.enabled ? "--watch" : "";

    this.buildCommand_ = `npx tsc --project ${WORKSPACE_DIR}/user.tsconfig.json ${watchStatement}`;
  }

  private readUserTsConfigFile() {
    const userBaseTsConfigPath: string =
      WORKSPACE_DIR + "/user.base.tsconfig.json";
    return fs.readFileSync(userBaseTsConfigPath).toString();
  }

  private writeUserTsConfigFile(data: string) {
    const userTsConfigPath: string = WORKSPACE_DIR + "/user.tsconfig.json";
    fs.writeFileSync(userTsConfigPath, data);
  }

  private initForTsConfig(
    rootDir: string,
    outDir: string,
    renderConfig: RenderConfig
  ) {
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

    this.logger.info("combined ts-config: ", this.tsConfig);

    this.writeUserTsConfigFile(JSON.stringify(this.tsConfig));
  }

  protected async doRender(
    filePath: string,
    rootDir: string,
    outDir: string
  ): Promise<void> {
    if (
      this.engineState.latestCompileTsTime &&
      this.engineState.latestCompileTsTime.getTime() >=
        fs.statSync(filePath).mtime.getTime()
    ) {
      this.logger.info(
        "skip render because latestCompileTsTime is newer than file mtime: ",
        filePath,
        this.engineState.latestCompileTsTime,
        fs.statSync(filePath).mtime
      );
      return;
    }

    this.logger.info("ts command: ", this.buildCommand_);
    this.engineState.latestCompileTsTime = new Date();

    if (this.renderConfig.watch?.enabled) {
      const process_ = exec(this.buildCommand_, (error_, stdout_, stderr_) => {
        if (error_) {
          this.logger.error(`exec error: ${error_}`);
          return;
        }
        this.logger.info(`stdout: ${stdout_}`);
        this.logger.error(`stderr: ${stderr_}`);
      });

      this.logger.info("start watching process on PID: ", process_.pid);
    } else {
      const output = execSync(this.buildCommand_).toString();

      this.logger.info("stdout: ", output);
    }
  }
}
