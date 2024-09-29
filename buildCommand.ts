import { LoggerConfig, LogLevel, NodeLogger } from "@nmhillusion/n2log4web";
import { execSync } from "child_process";

const logger = new NodeLogger(
  "buildCommand",
  new LoggerConfig()
    .setFocusType("color")
    .setIncludingTimestamp(true)
    .setLoggableLevel(LogLevel.DEBUG)
);

const commands = [
  `ts-node ./support/generate-info.ts`,
  `tsc`,
  `cp ./src/user.base.tsconfig.json ./package.json dist`,
  `cp -r ./src/resources dist`,
  `ts-node ./support/build-style-list-of-highlight.ts`,
  `ts-node ./support/build-publish-package-json.ts`,
];

for (const command of commands) {
  logger.info("command = ", command);
  const output = execSync(command, {
    encoding: "utf8",
    stdio: "pipe",
  });

  console.log(output);
}
