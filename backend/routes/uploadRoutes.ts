import express, { Request } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => {
    return {
      public_id: file.originalname.split('.')[0] + '-' + Date.now()
    };
  }
});

const upload = multer({ storage });

router.post('/', upload.single('image'), (req: Request, res) => {
  res.json({ imageUrl: req.file?.path });
});

export default router;
