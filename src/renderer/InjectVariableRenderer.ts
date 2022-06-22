import * as fs from "fs";
import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "../core/TraversalWorkspace";

export class InjectVariableRenderer extends Renderable {
  private variables = {};
  private readonly PATTERN__VARIABLE_REPLACEMENT: RegExp =
    /{{\s*n2v:(.+?)\s*}}/gi;

  constructor(
    variableFilePathToInject: string,
    traversaler: TraversalWorkspace
  ) {
    super(traversaler, "InjectVariableRenderer");
    this.loadVariableFromFile(variableFilePathToInject);
  }

  private loadVariableFromFile(filePath: string) {
    try {
      const rawContent = fs.readFileSync(filePath).toString();
      Object.assign(this.variables, JSON.parse(rawContent));
    } catch (e) {
      this.logger.error("Error when loading varibles from file: ", filePath, e);
    }
  }

  private obtainValueOfVariable(variableName: string): string {
    if (variableName) {
      const variableQueue = variableName.split(".");
      let value: {} = this.variables;

      for (const __currentKey of variableQueue) {
        value = value[__currentKey];

        if (!value) {
          break;
        }
      }

      if (this.variables === value) {
        throw new Error("Privilege Error: Not allow to access root variable");
      }

      return String(value);
    } else {
      return variableName;
    }
  }

  protected doRender(filePath: string, rootDir: string, outDir: string) {
    if (
      filePath &&
      (filePath.endsWith(".html") ||
        filePath.endsWith(".css") ||
        filePath.endsWith(".js"))
    ) {
      let fileContent = fs.readFileSync(filePath).toString();

      const matchingArray = fileContent.matchAll(
        this.PATTERN__VARIABLE_REPLACEMENT
      );

      for (const matching of matchingArray) {
        const [matchedString, matchGroup] = matching;
        this.logger.info(`var -> ${matchGroup}; file -> ${filePath}`);

        fileContent = fileContent.replace(matchedString, (_) =>
          this.obtainValueOfVariable(matchGroup)
        );
      }

      fs.writeFileSync(filePath, fileContent);
    }
  }
}
