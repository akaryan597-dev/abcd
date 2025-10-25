import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    staffId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true, default: 'Pending' },
    proofImageUrl: { type: String },
}, {
    timestamps: true,
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;
