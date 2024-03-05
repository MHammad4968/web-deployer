//importing libraries
import express from "express";
import cors from "cors";
import fs from "fs";
import simpleGit from "simple-git";
//importing inbuilt functions
import { generate } from "./utils";
import { zipFolder } from "./utils";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  console.log("Cloning from: ", repoUrl);
  await simpleGit().clone(repoUrl, `output/dirs/${id}`);
  zipFolder(`output/dirs/${id}`, `output/zips/${id}.zip`);
  console.log(`Cloned, zipped to output/zips/${id}.zip`);
  fs.rmSync(`output/dirs/${id}`, { recursive: true });
  console.log("Folder deleted");
  res.json({
    id: id,
    url: repoUrl,
  });
});
app.listen(3000);
console.log("Listening at port 3000");
