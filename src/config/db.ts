import mongoose from "mongoose";

const uri = process.env.MONGOOSE_DB as string
// console.log("uri", uri)

const connectDB = async () => {
    try {
        await mongoose.connect(uri)

        console.log("MONGODB connected to server")
    } catch (error) {
        console.error("MONGODB connection failed", error)
        process.exit(1)
    }
}

export default connectDB;