import express from "express";
import { connectMongoDB } from "*/config/mongodb";
import { env } from "*/config/environment";
import { apiV1 } from "*/routes/v1";
import cors from "cors";
import { corsOptions } from "*/config/cors";

const PORT = env.PORT || 4000;
const HOSTNAME = env.HOSTNAME || "localhost";

connectMongoDB()
  .then(() => console.log("Connected successfully"))
  .then(() => startServer())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const startServer = () => {
  const app = express();

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/v1", apiV1);

  app.listen(PORT, HOSTNAME, () => {
    console.log(`Running at port ${HOSTNAME}:${PORT}`);
  });
};
