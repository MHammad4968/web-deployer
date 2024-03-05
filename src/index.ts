import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";

const app = express();
app.use(cors());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  console.log("Cloning from: ", repoUrl);
  await simpleGit().clone(repoUrl, `output/${id}`);
  console.log("Saved to: ", `output/${id}`);
  res.json({});
});
app.listen(3000);
console.log("Listening at port 3000");
