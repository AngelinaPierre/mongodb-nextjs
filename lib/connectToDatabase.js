import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {}

let mongoClient; // this becomes our cached connection

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectToDatabase() {
    try {
        // checking if we have a cached client
        if (mongoClient) {
            return { mongoClient }
        }
        mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected!");
        return { mongoClient }
    } catch (error) {
        console.error(error);
    }
}