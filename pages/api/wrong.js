import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

// serverless function
export default async function handler(req, res) {
    try {
        const mongoClient = await (new MongoClient(uri, options)).connect();
        console.log("Just Connected!");

        // getting database
        const db = mongoClient.db("sample_restaurants");
        // getting collection
        const collection = db.collection("restaurants");
        // getting data results
        const results = await collection
            .find({})
            .project({
                grades: 0,
                borough: 0,
                restaurant_id: 0,
            })
            .limit(4)
            .toArray();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}