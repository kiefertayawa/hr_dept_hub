import express from 'express'
import getFamilyTree from '../controllers/memberController.js'

const router = express.Router()

router.get('/', getFamilyTree)

export default router