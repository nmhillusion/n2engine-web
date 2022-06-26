import * as fs from "fs";
import { TraversalWorkspace } from "../../src/core/TraversalWorkspace";

const traversalWorkspace = new TraversalWorkspace();
const startDir = fs.realpathSync(__dirname + "/../../sample");

test("test traversal", function () {
  traversalWorkspace.registerCallback({
    async invoke(filePath: string) {
      expect(filePath).toBeTruthy();
      expect(filePath.startsWith(startDir)).toBeTruthy();

      console.log("[pass traversal]", { filePath });
    },
  });

  traversalWorkspace.traversalPath(startDir);
});
