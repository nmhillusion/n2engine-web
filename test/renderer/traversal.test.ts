import { TraversalWorkspace } from "../../src/renderer/TraversalWorkspace";

const traversalWorkspace = new TraversalWorkspace();

traversalWorkspace.registerCallback({
  invoke(filePath: string) {
    console.log("[testing]", { filePath });
  },
});

traversalWorkspace.traversalPath(__dirname + "/../../sample");
