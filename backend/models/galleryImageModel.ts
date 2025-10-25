import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
    src: { type: String, required: true },
    alt: { type: String, required: true },
    aspect: { type: String, required: true },
}, {
    timestamps: true,
});

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

export default GalleryImage;
