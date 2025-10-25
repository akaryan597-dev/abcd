import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['customer', 'staff', 'admin'], default: 'customer' },
    
    // Customer specific fields
    address: { type: String },
    avatarUrl: { type: String },
    loyaltyPoints: { type: Number, default: 0 },

    // Staff specific fields
    assignedArea: { type: String },
    performance: { type: Number },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
