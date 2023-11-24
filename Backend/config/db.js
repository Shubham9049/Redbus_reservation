const {MongoClient}=require('mongodb')

require("dotenv").config();

const url=process.env.mongoURL




let dbConnection

module.exports={
    connectDB:(cb)=>{
        MongoClient.connect(url)
        .then((client)=>{
            dbConnection=client.db()
            return cb()
        })
        .catch(err=>{
            console.log(err)
            return cb(err)
        })
     },
     getDb:()=>dbConnection
}
 


