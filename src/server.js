import express from "express";
import { connectMongoDB } from "*/config/mongodb";

const PORT = process.env.PORT || 4000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

connectMongoDB()
  .then(() => console.log("Connected successfully"))
  .then(() => startServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const startServer = () => {
  const app = express();

  app.get("/", async (req, res) => {
    res.end("<h1>Hello World!</h1>");
  });

  app.listen(PORT, HOSTNAME, () => {
    console.log(`Running at port ${HOSTNAME}:${PORT}`);
  });
};
