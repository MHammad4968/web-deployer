import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import { createZip } from "./utils";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  console.log("Cloning from: ", repoUrl);
  await simpleGit().clone(repoUrl, `output/dirs/${id}`);
  console.log("Cloned to: ", `output/${id}`);
  res.json({
    id: id,
    url: repoUrl,
  });
});
app.listen(3000);
console.log("Listening at port 3000");
