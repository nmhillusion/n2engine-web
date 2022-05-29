import * as fs from "fs";

export const WORKSPACE_DIR: string = fs.realpathSync(__dirname + "/..");

export * from "./renderer/main";
export * from "./model/index";
