import express from 'express'
import searchMember from '../controllers/search.js';

const router = express.Router();

router.get('/:key', searchMember)

export default router