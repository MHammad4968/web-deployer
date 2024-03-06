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

export async function zipFolder(source: string, out: string): Promise<void> {
  const output = fs.createWriteStream(out);
  const archive = archiver("zip", {
    zlib: { level: 0 },
  });
  archive.pipe(output);
  archive.directory(source, false);
  await archive.finalize();
}
