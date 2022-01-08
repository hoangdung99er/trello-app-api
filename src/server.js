import express from "express";
import { abc } from "*/utils";

const app = express();

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

app.get("/", (req, res) => {
  res.end("<h1>Hello World!</h1>");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`Running at port ${HOSTNAME}:${PORT}`);
});
