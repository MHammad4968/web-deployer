"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = exports.getAllFiles = exports.zipFolder = exports.generate = void 0;
const maxlen = 6;
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = require("aws-sdk");
require("dotenv").config();
const s3 = new aws_sdk_1.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});
const awsbucket = process.env.AWS_BUCKET || "webdeploy-beta";
function generate() {
    let id = "";
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < maxlen; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}
exports.generate = generate;
function zipFolder(source, out) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = fs_1.default.createWriteStream(out);
        const archive = (0, archiver_1.default)("zip", {
            zlib: { level: 0 },
        });
        archive.pipe(output);
        archive.directory(source, false);
        yield archive.finalize();
    });
}
exports.zipFolder = zipFolder;
const getAllFiles = (folderPath) => {
    let result = [];
    const allfiles = fs_1.default.readdirSync(folderPath);
    allfiles.forEach((file) => {
        const filePath = path_1.default.join(folderPath, file);
        if (fs_1.default.statSync(filePath).isDirectory()) {
            result = result.concat((0, exports.getAllFiles)(filePath));
        }
        else {
            result.push(filePath);
        }
    });
    return result;
};
exports.getAllFiles = getAllFiles;
const uploadToS3 = (fileName, filePath) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Uploading ${fileName}`);
    const fileContent = fs_1.default.readFileSync(filePath);
    const response = yield s3
        .upload({
        Body: fileContent,
        Key: fileName,
        Bucket: awsbucket,
    })
        .promise();
    console.log(response);
});
exports.uploadToS3 = uploadToS3;
