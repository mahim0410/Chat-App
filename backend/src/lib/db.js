import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.log(`Error in connectDB function. Error is: ${error}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export default connectDB;