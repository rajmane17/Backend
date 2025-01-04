import { v2 as cloudinary } from 'cloudinary';
import exp from 'constants';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadOnCloudinary(localfilepath) {

    try {
        // Here we upload our local file to cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
        resource_type: "auto",
        });

        //upload successfull
        console.log("File uploaded successfully on cloudinary", response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localfilepath);
        return null;
    }

}

export {uploadOnCloudinary}