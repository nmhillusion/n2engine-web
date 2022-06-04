import * as fs from "fs";

export const WORKSPACE_DIR: string = fs.realpathSync(__dirname + "/..");

export * from "./core/index";
export * from "./model/index";
