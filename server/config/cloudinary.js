const cloudinary = require("cloudinary").v2;
const multer = require("multer");


cloudinary.config({
    cloud_name : "dmh7euix6",
    api_key : "897724449489675",
    api_secret: "WQb3n6tIuHKfT0T2AjB0lC3qpFY",
});  


const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) =>{
    const result = await cloudinary.uploader.upload(file,{
        resource_type: "auto",
    });
    return result;
};

const upload = multer({storage});

module.exports = {upload, imageUploadUtil};