const {connectDB,getDb}=require("./config/db")
const express=require("express")
const {routes}=require("./Routes/trips")
const {city}=require("./Routes/City")
const {client}=require("./Routes/coustomer.details")

const cors=require("cors")

require("dotenv").config()

const PORT=process.env.PORT;
const app=express()
app.use(cors());
app.use(express.json());
app.use("/red",routes)
app.use("/red",city)
app.use("/red",client)





connectDB((err)=>{
    if(!err){
        app.listen(PORT,()=>{
            console.log(`app is listening on port ${PORT}`)
        })
      
    }
})

