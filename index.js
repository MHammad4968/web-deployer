"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
//importing libraries
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const simple_git_1 = __importDefault(require("simple-git"));
//importing inbuilt functions
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/deploy", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = (0, utils_1.generate)();
    console.log("Cloning from: ", repoUrl);
    yield (0, simple_git_1.default)().clone(repoUrl, `output/dirs/${id}`);
    (0, utils_2.zipFolder)(`output/dirs/${id}`, `output/zips/${id}.zip`);
    console.log(`Cloned, zipped to output/zips/${id}.zip`);
    fs_1.default.rmSync(`output/dirs/${id}`, { recursive: true });
    console.log("Folder deleted");
    res.json({
      id: id,
      url: repoUrl,
    });
  }),
);
app.listen(3000);
console.log("Listening at port 3000");
