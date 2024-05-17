import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import {CloudinaryStorage}  from 'multer-storage-cloudinary';


// Cloudinary Configuration
cloudinary.config({
  cloud_name: "daryl123",
  api_key: "598865559955359",
  api_secret: "Bt2WJwmhfRQCAVwkdle1T6iPDUY",
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Optional - folder for the uploaded files
    allowed_formats: ['jpg', 'png', 'jpeg'], // Optional - allowed file formats
  },
});

const upload = multer({ storage: storage });
export default upload;