import express from 'express'
import sendMail from '../controllers/email.js';

const router = express.Router();

router.post('/send', sendMail)

export default router