import mongoose from "mongoose";
import { env } from "./env";

const connectDB = async () => {
    try {
        await mongoose.connect(env.DB_URL);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
        process.exit(1);
    }
};

export default connectDB;