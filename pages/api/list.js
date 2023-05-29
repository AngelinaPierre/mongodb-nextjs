// import { connectToDatabase } from "../../lib/connectToDatabase";
import clientPromise from "../../lib/mongodb";

// serverless function
export default async function handler(req, res) {
    try {
        // const { mongoClient } = await connectToDatabase();
        const mongoClient = await clientPromise;
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
            .limit(10)
            .toArray();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}