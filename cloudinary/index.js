const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,   //cloud_name, api_key, api_secret should not be changed with other names, they are fixed
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({ //storage is an instance of cloudinary storage
    cloudinary, 
    params : {
        folder : 'YelpCamp',  //folder will be folder name in cloudinary
        allowedFormats : ['jpeg', 'png', 'jpg']   
       }   
})

 module.exports = {cloudinary, storage}