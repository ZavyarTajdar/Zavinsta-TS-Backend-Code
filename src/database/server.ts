import mongoose, { Mongoose } from "mongoose";
import { DB_NAME } from "../constant.ts";

const connectDB = async (): Promise<void> => {
    try {
        const connectionInstance: Mongoose = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
        console.log(`📍 Host: ${connectionInstance.connection.host}`);
    } catch (error) {
       if (error instanceof Error) {
            console.error("❌ Error connecting to MongoDB:", error.message);
        } else {
            console.error("❌ Unknown error connecting to MongoDB:", error);
        }
        process.exit(1);
    }
}

export default connectDB;