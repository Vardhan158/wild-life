
import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRETKEY,
});

console.log('CLOUD_NAME:', process.env.CLOUD_NAME);
console.log('CLOUD_APIKEY:', process.env.CLOUD_APIKEY);
console.log('CLOUD_SECRETKEY:', process.env.CLOUD_SECRETKEY);

try {
  const res = await cloudinary.uploader.upload('../dummy.png', { folder: 'wild-life' });
  console.log(res.secure_url);
} catch (e) {
  console.error('Error:', e);
}

