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
exports.getAllFiles = exports.zipFolder = exports.generate = void 0;
const maxlen = 6;
const fs_1 = __importDefault(require("fs"));
const archiver_1 = __importDefault(require("archiver"));
const path_1 = __importDefault(require("path"));
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
        result.push(filePath);
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
