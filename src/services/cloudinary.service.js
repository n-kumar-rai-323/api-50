const { cloudinaryConfig } = require('../config/config');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
class CloudinaryService{

constructor(){
    cloudinary.config({
        cloud_name:cloudinaryConfig.cloud_name,
        api_key:cloudinaryConfig.api_key,
        api_secret:cloudinaryConfig.api_secret
    })
}
uploadFile= async(file,dir='')=>{
    try{

        const uploadResult = await cloudinary.uploader.upload(file,{
            unique_filename:true,
            folder: "api-50/" + dir,

        });
        fs.unlinkSync(file);
        const optimizeUrl = cloudinary.url(uploadResult.public_id,{
            quality:"auto",
            fetch_format:"auto"
        })

        return{uploadResult, optimizeUrl};
    }catch (error) {
    console.error("Cloudinary Error:", error);

    throw {
        code: 422,
        message: error.message || "Cloudinary upload failed",
        status: "CLOUDINARY_UPLOAD_FAILED"
    };
}

}

}
const cloudinarySvc = new CloudinaryService();

module.exports = cloudinarySvc;