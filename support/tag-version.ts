import * as shx from "shelljs";
import { version } from "../package.json";

const command = `git tag v${version}`;

console.log(shx.exec(command));
