import * as fs from "fs";

export const WORKSPACE_DIR: string = fs.realpathSync(process.cwd());

console.log("WORKSPACE_DIR: ", WORKSPACE_DIR);

export * from "./core/index";
export * from "./model/index";
