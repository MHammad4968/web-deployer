//importing libraries
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { S3 } from "aws-sdk";
import simpleGit from "simple-git";

//importing custom functions
import { generate, getAllFiles, uploadToS3, zipFolder } from "./utils";
require("dotenv").config();

//Main app
const app = express();
app.use(cors());
app.use(express.json());

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  console.log("Cloning from: ", repoUrl);
  await simpleGit().clone(repoUrl, `output/dirs/${id}`);
  console.log("Cloned to output/dirs/", id);
  const files = getAllFiles(path.join(__dirname, `output/dirs/${id}`));
  console.log("Files: ", files);
  files.forEach(async (file) => {
    await uploadToS3(file.slice(__dirname.length + 1), file);
  });
  res.json({
    id: id,
    url: repoUrl,
  });
});
app.listen(3000);
console.log("Listening at port 3000");
