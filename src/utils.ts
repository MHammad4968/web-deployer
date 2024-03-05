const maxlen = 6;
import fs from "fs";
import archiver from "archiver";

export function generate() {
  let id = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < maxlen; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function zipFolder(folderPath: string, outputPath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", {
      zlib: { level: 0 }, // Set compression level to 0
    });

    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log("Zip file created successfully");
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory(folderPath, false); // Add folder to archive
    archive.finalize();
  });
}
