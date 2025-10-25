import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    origin: { type: String, required: true },
    nutrition: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
