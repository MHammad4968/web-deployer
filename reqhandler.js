const express = require("express");
const aws_sdk = require("aws-sdk");
require("dotenv").config();
const s3 = new aws_sdk.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});
const app = express();
app.get("/*", async (req, res) => {
  const host = req.hostname;
  const id = host.split(".")[0];
  console.log(`ID Accessed: ${id}`);
  const filePath = req.path;
  console.log("File: ", filePath);

  const contents = await s3
    .getObject({
      Bucket: "webdeploy-beta",
      Key: `output/dirs/${id}${filePath}`,
    })
    .promise();
  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
      ? "text/css"
      : filePath.endsWith("js")
        ? "application/javascript"
        : filePath.endsWith("png")
          ? "image/png"
          : filePath.endsWith("jpg") || filePath.endsWith("jpeg")
            ? "image/jpeg"
            : "text/plain";
  res.set("Content-Type", type);
  res.send(contents.Body);
});

app.listen(3001);
