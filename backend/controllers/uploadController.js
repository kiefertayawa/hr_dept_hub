import Member from '../models/memberModel.js'
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConfig from '../config/cloudinaryConfig.js';

cloudinary.config(cloudinaryConfig);

// Image upload handler
const uploadMemberImage = async (req, res) => {
  console.log("Adding new member");
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

    // Get the next member ID by getting the maximum id in the database
    const highestId = async() => {
      const allMembers = await Member.find();
      let maxId = 0
      for(const member of allMembers){
        if(parseInt(member.id) > maxId){
          maxId = parseInt(member.id) // parse member id from string to int
        }
      }
      console.log(maxId)
      return '' + (maxId + 1) // Increment the member count for the new member ID and turn back into string
    }
    const newId = await highestId();

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
    console.log("res.body: ", newMember);
  } catch (error) {
    console.error('Server Error uploading image:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
};


export default  {
  uploadMemberImage
}
