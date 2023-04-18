import express from "express";
import serveIndex from "serve-index";

console.log("Starting server...");
const publicDir = "../front/dist";
const port = 3000;
const app = express();

app.use(express.static(publicDir));
app.use(serveIndex(publicDir));

app.listen(port, () => {
  console.log(`Started server on port ${port}`);
});
