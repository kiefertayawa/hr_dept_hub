import express from 'express'
import multer from 'multer';

import uploadController from '../controllers/uploadController.js'

const router = express.Router();
// const { authenticateUser, authorizeMerchant } = require("../middlewares/authMiddleware");

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Set the destination folder for storing temporary files

// Protected routes (authentication required)
// router.use(authenticateUser);

// Route to upload image 
// TODO: Need to restrict to admin
router.post("/upload-member-image", upload.single('imageUrl'), uploadController.uploadMemberImage);

export default router








// const express = require("express");
// const router = express.Router();
// const { uploadImage } = require("../controllers/uploadController");
// const { authenticateUser, authorizeMerchant } = require("../middlewares/authMiddleware");
// const multer = require('multer');

// // Configure multer for file uploads
// const upload = multer({ dest: 'uploads/' }); // Set the destination folder for storing temporary files

// // Protected routes (authentication required)
// router.use(authenticateUser);

// // Route to upload image restricted to authenticated merchants
// router.post("/upload-image", authorizeMerchant, upload.single('image'), uploadImage);

// module.exports = router;
