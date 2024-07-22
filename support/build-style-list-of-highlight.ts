import * as fs from "fs";
import * as path from "path";

function listStyleFileNames(path_: string) {
  return fs.readdirSync(path_, "utf8");
}

function saveTypeForHighlightStyleNames(path_: string, styleNames: string[]) {
  fs.writeFileSync(
    path_,
    `export type AVAILABLE_HIGHLIGHT_STYLE_NAMES = ${styleNames
      .map((s) => `"${s}"`)
      .join(" |")};`
  );
}

const availableHighlightStyleNames = listStyleFileNames(
  path.resolve("./node_modules/highlight.js/styles")
)
  .filter((f) => f.endsWith(".min.css"))
  .map((f) => f.replace(/\.min\.css$/, ""));

console.log({ availableHighlightStyleNames });

saveTypeForHighlightStyleNames(
  path.resolve("./src/model/highlight-style-names.ts"),
  availableHighlightStyleNames
);
