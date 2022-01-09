import { MongoClient } from "mongodb";
import { env } from "*/config/environment";

let dbInstance = null;

const uri = env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connectMongoDB = async () => {
  await client.connect();
  // Assign clientDB to our dbInstance
  dbInstance = client.db(env.DB_NAME);
};

// const listDatabases = async () => {
//   const databaseList = await client.db().admin().listDatabases();

//   databaseList.databases.forEach((db) => console.log(` - ${db.name}`));
// };

// Get database Instance
export const getDB = () => {
  if (!dbInstance) throw new Error("Connection failed!");

  return dbInstance;
};
