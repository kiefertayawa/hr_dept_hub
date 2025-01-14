import dotenv from 'dotenv';

// Load environment variables (adjust the path to your actual credentials.env file)
dotenv.config({ path: './.env' });

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
};

export default cloudinaryConfig;
