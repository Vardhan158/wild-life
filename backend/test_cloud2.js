
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dne1x4r8',
  api_key: '283979167897122',
  api_secret: 'LtgMxF0fCETw6-i7kxVhbXSDm9M',
});

try {
  const res = await cloudinary.uploader.upload('../dummy.png', { folder: 'wild-life' });
  console.log(res.secure_url);
} catch (e) {
  console.error('Error:', e);
}

