import asyncHandler from 'express-async-handler';
import GalleryImage from '../models/galleryImageModel.js';

// @desc    Fetch all gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = asyncHandler(async (req, res) => {
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    res.json(images);
});

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const addGalleryImage = asyncHandler(async (req, res) => {
    const { src, alt, aspect } = req.body;
    const image = new GalleryImage({ src, alt, aspect });
    const createdImage = await image.save();
    res.status(201).json(createdImage);
});

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = asyncHandler(async (req, res) => {
    const image = await GalleryImage.findById(req.params.id);
    if (image) {
        await image.deleteOne();
        res.json({ message: 'Image removed' });
    } else {
        res.status(404);
        throw new Error('Image not found');
    }
});

export { getGalleryImages, addGalleryImage, deleteGalleryImage };
