import * as fs from "fs";

export const WORKSPACE_DIR: string = fs.realpathSync(__dirname);

console.log("WORKSPACE_DIR: ", WORKSPACE_DIR);

export * from "./core/index";
export * from "./model/index";
