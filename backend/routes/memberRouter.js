import express from 'express'
import multer from 'multer';

import memberController from '../controllers/memberController.js'
import adminPrivilages from '../middleware/authRequired.js'

const router = express.Router()


// Get all members
router.get('/getAll', memberController.getFamilyTree)

// Get single member
router.get('/get-member-by-id/:id', memberController.getMemberById)

// Get single bloodline
router.get('/get-bloodline/:id', memberController.getBloodline)


// limits certain crud functions for admin use only
router.use(adminPrivilages)

// DELETE a single member
router.delete('/delete-member-by-id', memberController.deleteMemberById)

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for storing temporary files

// PUT member detail
router.put('/update-member-by-id', upload.single('image'), memberController.updateMemberById)


export default router