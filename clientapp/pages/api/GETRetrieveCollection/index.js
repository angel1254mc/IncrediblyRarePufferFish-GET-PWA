import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DB_URL);
client.connect().then(() => console.log("Successfully connected to MongoDB"));

export default async (req, res) => {
    const {method} = req;
    //Any request done in this endpoint gets the full collection
    switch (method) {
        case 'GET':
            try {
                const db = client.db("GlossaryEmergingTech");
                const collection = db.collection("Terms");
                let results = await collection.find().limit(100).toArray();
                console.log(results);
                return res.send(results)
            }
            catch (err)
            {
                console.log(err);
            }
            //Do Stuff Here
            break;
    }
}