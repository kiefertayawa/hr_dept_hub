import express from 'express'
import multer from 'multer';

import memberController from '../controllers/memberController.js'

const router = express.Router()

// Get all members
router.get('/getAll', memberController.getFamilyTree)

// Get single member
router.get('/get-member-by-id/:id', memberController.getMemberById)


// // POST new member 
// // (primitive adding of new member; updated one is in upload router)
// router.post('/add-new-member', memberController.addMember)


// DELETE a single member
// TODO: Need to restrict to admin
router.delete('/delete-member-by-id', memberController.deleteMemberById)


// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for storing temporary files

// PUT member detail
// TODO: Need to restrict to admin
router.put('/update-member-by-id', upload.single('image'), memberController.updateMemberById)





export default router