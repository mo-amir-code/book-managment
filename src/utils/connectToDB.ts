import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


export const connectToDB = async () => {
    await mongoose.connect(process.env.DB_URI!)
    console.log("Database is connected....")
}