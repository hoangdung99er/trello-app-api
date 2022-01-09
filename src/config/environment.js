require("dotenv").config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
};
