const maxlen = 6;
import fs from "fs";
import archiver from "archiver";
import path from "path";
import { S3 } from "aws-sdk";
require("dotenv").config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const awsbucket = process.env.AWS_BUCKET || "webdeploy-beta";

export function generate() {
  let id = "";
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < maxlen; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export async function zipFolder(source: string, out: string): Promise<void> {
  const output = fs.createWriteStream(out);
  const archive = archiver("zip", {
    zlib: { level: 0 },
  });
  archive.pipe(output);
  archive.directory(source, false);
  await archive.finalize();
}

export const getAllFiles = (folderPath: string) => {
  let result: string[] = [];
  const allfiles = fs.readdirSync(folderPath);
  allfiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      result = result.concat(getAllFiles(filePath));
    } else {
      result.push(filePath);
    }
  });
  return result;
};

export const uploadToS3 = async (fileName: string, filePath: string) => {
  console.log(`Uploading ${fileName}`);
  const fileContent = fs.readFileSync(filePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Key: fileName,
      Bucket: awsbucket,
    })
    .promise();
  console.log(response);
};
