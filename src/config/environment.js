require("dotenv").config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,
};
