"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zipFolder = exports.generate = void 0;
const maxlen = 6;
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
function generate() {
    let id = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < maxlen; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}
exports.generate = generate;
function zipFolder(source, out) {
    const output = fs_1.default.createWriteStream(out);
    const archive = (0, archiver_1.default)("zip", {
        zlib: { level: 0 },
    });
    archive.pipe(output);
    archive.directory(source, false);
    archive.finalize();
}
exports.zipFolder = zipFolder;
