import Member from '../models/memberModel.js'
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConfig from '../config/cloudinaryConfig.js';

cloudinary.config(cloudinaryConfig);

// Image upload handler
const uploadMemberImage = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);
    console.log(process.env.CLOUDINARY_API_SECRET); // Should not be undefined if the path is correct


    // Default placeholder image URL
    const placeholderImageUrl = '/pfp-placeholder.jpeg'; // location of placeholder image

    let imageUrl;

    if (req.file) {
      // Upload to Cloudinary if a file is provided
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Cloudinary Upload Result:", result);

      imageUrl = result.secure_url;

      // Remove the temporary file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Failed to delete local file:', err);
      });
    } else {
      // Use the placeholder if no file is uploaded
      imageUrl = placeholderImageUrl;
    }

    // Create a new member
    const { id, parentId, name, collegeBatch, ysesBatch, bloodline } = req.body;
    const newMember = new Member({
      id, 
      parentId, 
      name, 
      collegeBatch, 
      ysesBatch, 
      bloodline,
      imageUrl,
    });
    await newMember.save();

    res.status(201).json({ success: true, message: 'Member added successfully', imageUrl });
  } catch (error) {
    console.error('Server Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
};


export default  {
  uploadMemberImage
}

// module.exports = { uploadImage };

// const cloudinary = require('cloudinary').v2;
// const Product = require('../models/Product');
// const cloudinaryConfig = require('../config/cloudinaryConfig');
// const multer = require('multer');

// cloudinary.config(cloudinaryConfig); // Import the Cloudinary config

// // Configure multer for file uploads
// const upload = multer({ dest: 'uploads/' }); // Set the destination folder for storing temporary files

// const uploadImage = async (req, res) => {
//     try {
//       console.log("upload image controller...");
//       console.log("This is also the request body object: ", req.body); // This will show form data
//       console.log("This is the uploaded file object: ", req.file); // This will show the uploaded file object
  
//       // Upload the image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);
//       const imageUrl = result.secure_url;
  
//       // Create a new product using the form data
//       const { productName, description, productType, quantity, price } = req.body; // Extract price from request body
//       const product = new Product({
//         productName,
//         description,
//         productType,
//         quantity,
//         price,
//         imageUrl
//       });
//       await product.save();
  
//       // Respond with success message
//       res.status(201).json({ success: true, message: 'Product created successfully' });
//     } catch (error) {
//       console.error('Server Error uploading image:', error);
//       res.status(500).json({ success: false, message: 'Failed to upload image' });
//     }
//   };
  
//   module.exports = { uploadImage };
  