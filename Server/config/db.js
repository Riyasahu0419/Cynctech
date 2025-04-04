const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config() 

const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("server connected to database")
    } catch (error) {
        console.log("MongoDB connection faile")
    }
}

module.exports=connectDb