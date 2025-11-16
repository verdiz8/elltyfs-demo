// lib/db.ts
import { MongoClient, ObjectId } from "mongodb";

// Define the environment variables with proper typing
interface ProcessEnv {
  MONGODB_URI: string;
  MONGODB_NAME?: string;
  NODE_ENV?: string;
}

// Type assertion for process.env
const env = process.env as unknown as ProcessEnv;

if (!env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const uri = env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(env.MONGODB_NAME || "elltydemo");
}
