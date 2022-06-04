import * as fs from "fs";
import { Renderable } from "./Renderable";
import { TraversalWorkspace } from "../core/TraversalWorkspace";

export class InjectVariableRenderer extends Renderable {
  private variables = {};
  private readonly PATTERN__VARIABLE_REPLACEMENT = /{{\s*n2v:(.+?)\s*}}/;

  constructor(
    variableFilePathToInject: string,
    traversaler: TraversalWorkspace
  ) {
    super(traversaler);
    this.loadVariableFromFile(variableFilePathToInject);
  }

  private loadVariableFromFile(filePath: string) {
    try {
      const rawContent = fs.readFileSync(filePath).toString();
      Object.assign(this.variables, JSON.parse(rawContent));
    } catch (e) {
      console.error("Error when loading varibles from file: ", filePath, e);
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

      const matches = fileContent.matchAll(
        new RegExp(this.PATTERN__VARIABLE_REPLACEMENT, "gi")
      );

      let reg: IteratorResult<RegExpMatchArray, any> = null;
      while ((reg = matches.next()) && !reg.done) {
        console.log(
          "[inject var]: var -> ",
          reg.value[1],
          "; file -> ",
          filePath
        );

        fileContent = fileContent.replace(reg.value[0], (_) =>
          this.obtainValueOfVariable(reg.value[1])
        );
      }

      fs.writeFileSync(filePath, fileContent);
    }
  }
}
