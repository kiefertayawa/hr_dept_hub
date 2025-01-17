import Member from '../models/memberModel.js'
import mongoose from 'mongoose'
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';
import cloudinaryConfig from '../config/cloudinaryConfig.js';

cloudinary.config(cloudinaryConfig);

// Sets the bloodline of each member, run only once
// Modified to add mentor's name to each member object
const setBloodlines = async () => {

    // Recursively gets all the descendants of a given node and pushes to a given bloodline array
    const setAllDescendants = async (parentName, parentID) => {
        
        const children = await Member.find({parentId:parentID})
        
        if(children.length!==0){
            for (const child of children){
                // await Member.findOneAndUpdate({id:child.id}, {bloodline:bloodlineID})
                await Member.findOneAndUpdate({id:child.id}, {mentor:parentName})
                await setAllDescendants(child.name, child.id)
            }
        }

    }

    const charterMembers = await Member.find({ysesBatch:"Charter"})

    for (const charterMember of charterMembers){
        // await Member.findOneAndUpdate({id:charterMember.id}, {bloodline:charterMember.id})
        await Member.findOneAndUpdate({id:charterMember.id}, {mentor:null})
        await setAllDescendants(charterMember.name, charterMember.id)
    }  

}

// For sending family tree content
const getFamilyTree = async (req, res) => {
    try {
        const toSend = [];
        const charterMembers = await Member.find({ ysesBatch: "Charter" });

        // Grabs all the descendants of each charter member and puts them in a bloodline
        for (const charterMember of charterMembers) {
            const bloodline = await Member.find({ bloodline: charterMember.id });

            toSend.push(bloodline);
        }

        // CORS
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(toSend);

    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};



// For getting specific member
const getMemberById = async (req, res) => {
    // Retrieve id in parameters
    const {id} =  req.params

    // Check if valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Member does not exist'})
    }

    // Assign to local variable
    const member = await Member.findById(id)

    // If memmber does not exist
    if (!member) {
        return res.status(404).json({error: 'Member does not exist'})
    }

    // Return response
    res.status(200).json(member)    
}


// // For adding new member
// // (primitive adding of new member; updated one is in upload router)
// const addMember = async (req, res) => {
//     const {id, parentId, name, collegeBatch, ysesBatch, bloodline} = req.body

//     try {
//         const member = await Member.create({id, parentId, name, collegeBatch, ysesBatch, bloodline})
//         res.status(200).json(member)
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({error: error.message})
//     }    
// }


// For updating member details
const updateMemberById = async (req, res) => {
    console.log("Update member by id");
    try {         
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);

    // Default placeholder image URL
    const placeholderImageUrl = req.body.imageUrl; // location of placeholder image

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

    const { _id, name, collegeBatch, ysesBatch, mentor } = req.body;
    const updatedMember = await Member.findByIdAndUpdate(
        _id,
        { name, collegeBatch, ysesBatch, mentor, imageUrl },
        { new: true }
    );

    if (!updatedMember) {
        return res.status(404).json({ error: 'Member not found' });
    }

    res.status(200).json(updatedMember);
    console.log("res.body: ", updatedMember);
    } catch (error) {
        console.error('Error updating member:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};



// For deleting a single member
const deleteMemberById = async (req, res) => {
    console.log("Delete member by id");
    try {
        console.log("req.body: ", req.body);

        const deletedMember = await Member.findByIdAndDelete(req.body._id);
        
        if (!deletedMember) {
            return res.status(404).json({ error: "Member not found" });
        }
    
        res.json({ message: "Member deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }

}





export default  {
    setBloodlines, 
    getFamilyTree, 
    getMemberById, 
    // addMember,
    updateMemberById,
    deleteMemberById,
}