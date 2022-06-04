import * as fs from "fs";
import { name, version, description } from "../package.json";

// if (!fs.existsSync(filePathToWrite)) {
//   fs.createWriteStream(filePathToWrite, {
//     autoClose: true,
//   });
// }

fs.writeFile(
  __dirname + "/../src/core/EngineInfo.ts",
  `
  export const EngineInfo = {
    name: "${name}",
    version: "${version}",
    description: "${description}"
  };
`,
  {
    flag: "w",
  },
  (err) => {
    if (err) {
      console.error("Error when writing engine info: ", err);
    } else {
      console.log("writing engine info success");
    }
  }
);
