// File humare pass already system pe upload hogai hai.
// uske baad hi ye utility hum use karenge.
// file kaise upload hui hai.... multer ke through 


// Jo bhi ye service use karega vo hume ek local file ka path (local file yani jo file server pe aa chuki hai)

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

async function uploadOnCloudinary(localfilepath) {
    try {
        if( !localfilepath ) return null;

        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto",
        })

        // file has been uploaded successfully
        console.log("File uploaded successfully", response.url);
        return response;

        // Now, delete the file from local system

        
    } catch (error) {
        // agar hum ye utility use kr rhe hai to hume pata hai humare pass localfilepath hai.
        // lekin vo cloudinary pe upload nhi ho paya
        // so for safety purpose hum use db se bhi nikal dete because vo file curropted hone ke chances hai.

        fs.unlinkSync(localfilepath) // removes the localy stored temperory file
        return null;
    }
}


export {uploadOnCloudinary}