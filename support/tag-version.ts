import * as shx from "shelljs";
import { version } from "../package.json";

const command = `git tag v${version} && git push --tag`;

const { stdout, stderr, code } = shx.exec(command);
console.log("result of command: ", { stderr, stdout, code });
