import { adder, version, greet } from "../common";

(function () {
  console.assert(9 == adder(5)(4), "4 + 5");
  console.log("version: ", version());
  console.log("message: ", greet("have a great day"));
})();
