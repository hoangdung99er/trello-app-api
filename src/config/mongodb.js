import { MongoClient } from "mongodb";
import { env } from "*/config/environment";

const uri = env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connectMongoDB = async () => {
  try {
    await client.connect();

    console.log("Connected DB successfully");

    await listDatabases();
  } finally {
    // Close connection
    await client.close();
  }
};

const listDatabases = async () => {
  const databaseList = await client.db().admin().listDatabases();

  databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
};
