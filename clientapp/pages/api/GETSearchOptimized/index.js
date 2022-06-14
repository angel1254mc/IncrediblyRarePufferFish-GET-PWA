//Gotta Import MongoDB and implement search thru the Try Catch
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DB_URL);
client.connect().then(() => console.log("Successfully connected to MongoDB"));

export default async (req, res) => {
    const {method} = req;
    const {searchTerm} = req.query;

    if (!searchTerm)
      console.log("Search Term never existed");
        //I'll figure this out later
    switch (method) {
        case 'GET':
            try {
                const db = client.db("GlossaryEmergingTech");
                const collection = db.collection("Terms");
                const results = await collection.aggregate([
                    {
                      $search: {
                        index: "GETSearchOptimized",
                        compound: {
                          must: [
                            {
                              text: {
                                query: searchTerm,
                                path: "TITLE",
                                fuzzy: {
                                  maxEdits: 1,
                                }
                              }
                            }
                          ]
                        }
                      }
                    },
                    {
                      $limit: 20,
                    },
                    {
                      $project: {
                        TITLE: 2,
                        DESCRIPTION: 1,
                        SOURCE: 1,
                        _id: 0,
                        score: {
                          $meta: "searchScore"
                        },
                      }
                    }
                  ]).toArray();
                  return res.send(results);
            }
            catch (err) {
                res.status(500).send("Internal server error at OptimizedSearch")
            }
        break;
        
        default:
            res.setHeader('Allow', ["GET"]);
            res.status(405).send('Method ' + method + ' Not Allowed')
            
    }
    return;
}