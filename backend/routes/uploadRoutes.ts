
import path from 'path';
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
// FIX: Import multer to make its declaration merging for Express.Request available
import 'multer';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'yadukul-dairy',
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => file.originalname.split('.')[0] + '-' + Date.now(),
    } as any,
});

const parser = multer({ storage: storage });

router.post('/', parser.single('image'), (req, res) => {
    if (req.file) {
        res.send({
            message: 'Image uploaded successfully',
            url: req.file.path
        });
    } else {
        res.status(400);
        throw new Error('No file uploaded');
    }
});

export default router;
