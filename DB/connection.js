import mongoose from "mongoose"

const connectDB = async () => {
    return await mongoose.connect(process.env.DB_URL) 
    
} 
export default connectDB