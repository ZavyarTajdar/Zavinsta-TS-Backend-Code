import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filepath: string): Promise<UploadApiResponse> => {
    try {
        if (!filepath) return Promise.reject('Filepath is required');

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
        });
        fs.unlinkSync(filepath)
        return Promise.resolve(response);
    } catch (error: unknown) {
        fs.unlinkSync(filepath); // remove the locally save tempapory file if operation got failed
        console.error("Error uploading file to Cloudinary:", error);
        return Promise.reject('Filepath is required');;
    }
}
export { uploadOnCloudinary }