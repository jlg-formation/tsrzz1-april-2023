import express from "express";
import serveIndex from "serve-index";

import api from "./api";

console.log("Starting server...");
const publicDir = "../front/dist";
const port = 3000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", api);

app.use(express.static(publicDir));
app.use(serveIndex(publicDir));

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});
