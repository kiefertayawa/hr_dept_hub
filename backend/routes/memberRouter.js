import express from 'express'
import memberController from '../controllers/memberController.js'

const router = express.Router()

router.get('/getAll', memberController.getFamilyTree)



// Get single member
router.get('/:id', memberController.getMember)


// POST new member
router.post('/', memberController.addMember)


// // DELETE a single member
// router.delete('/:id', memberController.deleteMember)

// // PATCH member detail
// router.patch('/:id', memberController.editMember)










export default router