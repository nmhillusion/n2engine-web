import * as fs from "fs";
import express from "express";
const app = express();
const port = 3000;

const p = process.cwd() + "/sampleDist/page";
console.log({ p });
console.log("existed: ", fs.existsSync(p));

app.use("/", express.static(p));

// app.get("/", (req, res) => {
//   res.send("!Sample App!");
// });

app.listen(port, () => {
  console.log(`Sample App listening on port ${port}: http://localhost:${port}`);
});
