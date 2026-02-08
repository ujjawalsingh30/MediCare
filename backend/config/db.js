import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://ujjawalsingh7072:9113796730@cluster0.gtwhr7v.mongodb.net/MediCare")
    .then(()=>{
        console.log("DB CONNECTED");
        
    })
}