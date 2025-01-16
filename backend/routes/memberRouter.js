import express from 'express'
import memberController from '../controllers/memberController.js'

const router = express.Router()

// Get all members
router.get('/getAll', memberController.getFamilyTree)

// Get single member
router.get('/get-member-by-id/:id', memberController.getMemberById)


// // POST new member 
// // (primitive adding of new member; updated one is in upload router)
// router.post('/add-new-member', memberController.addMember)


// PATCH member detail
// TODO: Need to restrict to admin
router.patch('/update-member-by-id/:id', memberController.updateMemberById)


// // DELETE a single member
// router.delete('/:id', memberController.deleteMember)











export default router