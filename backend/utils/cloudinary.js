import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import upload from '../middlewares/multer.js';

// config cloundinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//to upload files to cloudinary
export async function uploadToCloudinary(filePath, folder = "Doctor") {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: "image"
        });

        // remove the local file after upload
        fs.unlinkSync(filePath);
        return result;
    
    } 
    catch (err) {
        console.log("Cloudinary upload error:", err);
        throw err;
        
    }
}

// to delete an image that is present in cloudinary if user remove from the UI
export async function deleteFromCloudinary(PublicId){
    try {
        if (!PublicId) return;
        await cloudinary.upload.destroy(PublicId);
    } catch (err) {
        console.log("Cloudinary delete error:", err);
        throw err;
        
    }
}

export default cloudinary;