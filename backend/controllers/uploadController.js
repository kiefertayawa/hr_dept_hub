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

    // TODO: i think this could break the db if many members are deleted but it will work for the meantime
    // Get the next member ID by counting the current members
    const memberCount = await Member.countDocuments({});
    const newId = memberCount + 1;  // Increment the member count for the new member ID

    // Create a new member with the incremented ID and uploaded image URL
    const { parentId, name, collegeBatch, ysesBatch, bloodline, mentor } = req.body;
    const newMember = new Member({
      id: newId, 
      parentId, 
      name, 
      collegeBatch, 
      ysesBatch, 
      bloodline,
      mentor,
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
