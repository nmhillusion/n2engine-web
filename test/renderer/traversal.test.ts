import { TraversalWorkspace } from "../../src/renderer/TraversalWorkspace";

const traversalWorkspace = new TraversalWorkspace();

test("test traversal", function () {
  traversalWorkspace.registerCallback({
    invoke(filePath: string) {
      expect(filePath).toBeTruthy();
      
      console.log("[testing]", { filePath });
    },
  });

  traversalWorkspace.traversalPath(__dirname + "/../../sample");
});
