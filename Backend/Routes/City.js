const {getDb}=require("../config/db")
const city=require("express").Router()

let db

city.get("/city",async (req,res)=>{
    db=getDb()
    try {
        const collection=db.collection("Cities")
        const data=await collection.find({}).toArray();
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
    }
})

// Get bus routes based on search criteria
// city.get('/city', async (req, res) => {
//     const { from, to } = req.query;
//     db=getDb()
//     try {
//       // If both 'from' and 'to' are provided, search for specific route
//       if (from && to) {
//         const busRoutesCollection=db.collection("Cities")
//         const busRoutes = await busRoutesCollection.find({ from, to }).toArray();
//         res.json(busRoutes);
//       } else {
//         // If only one of them is provided, return an error
//         res.status(400).json({ error: 'Both "from" and "to" parameters are required for searching routes.' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });



  


// post method
city.post("/city",(req,res)=>{
    db=getDb()
    const cities=req.body
    db.collection('Cities')
    .insertOne(cities)
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        res.status(400).json({err:"could not create a new document"})
        console.log(err.message)
    })
})




module.exports={city}