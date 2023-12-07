const { getDb } = require("../config/db")
const routes=require("express").Router()

let db

// get all the trip

routes.get("/buslist", async (req,res)=>{
    db=getDb()
      try {
        const collection=db.collection("books")
        const data=await collection.find({}).toArray();
        res.json(data)
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
    })
    // Get list of buses running between specified route
    routes.get('/allbuses', async (req, res) => {
      const { from, to, date } = req.query;
      db = getDb();
    
      try {
        // If both 'from', 'to', and 'date' are provided, search for buses on the route
        if (from && to && date) {
          const collection = db.collection("books");
          const query = {
            from,
            to,
            "schedule.startDate": { $lte: date }, // Check if the bus starts on or before the specified date
            "schedule.endDate": { $gte: date } ,   // Check if the bus runs on or after the specified date
            "schedule.daysOfWeek": new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
          };
    
          const busesOnRoute = await collection.find(query).toArray();
          res.json(busesOnRoute);
        } else {
          // If any of them is missing, return an error
          res.status(400).json({ error: 'Both "from", "to", and "date" parameters are required for searching buses.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // // post routes
    routes.post("/adddata",(req,res)=>{
        db=getDb()
    const book=req.body
    db.collection('books')
    .insertOne(book)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(400).json({err:"could not create a new document"})
        console.log(err.message)
    })
})


    module.exports={routes}