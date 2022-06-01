import * as shx from "shelljs";
import { version } from "../package.json";

const command = `git tag v${version} && git push -u`;

console.log(shx.exec(command));
