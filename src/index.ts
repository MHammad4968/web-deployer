import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

app.post("/deploy", (req, res) => {
  const repoUrl = req.body.repoUrl;
  console.log("Deploying from: ", repoUrl);

  res.json({});
});
app.listen(3000);
console.log("Listening at port 3000");
