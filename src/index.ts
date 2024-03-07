//importing libraries
import express from "express";
import cors from "cors";
import fs from "fs";
import { S3 } from "aws-sdk";
import simpleGit from "simple-git";
//import util from "util";
//importing custom functions
import { generate, getAllFiles, zipFolder } from "./utils";
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  endpoint: process.env.AWS_ENDPOINT,
});
app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate();
  console.log("Cloning from: ", repoUrl);
  await simpleGit().clone(repoUrl, `output/dirs/${id}`);
  console.log("Cloned to output/dirs/", id);

  //await zipFolder(`output/dirs/${id}`, `output/zips/${id}.zip`);
  //console.log(`Cloned, zipped to output/zips/${id}.zip`);
  //fs.rmSync(`output/dirs/${id}`, { recursive: true });
  //console.log("Folder deleted");
  res.json({
    id: id,
    url: repoUrl,
  });
});
app.listen(3000);
console.log("Listening at port 3000");
