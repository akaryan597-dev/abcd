import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { phone, role } = req.body;

    // In a real app, you would verify an OTP here.
    // For this simulation, we find or create the user.
    
    let user = await User.findOne({ phone, role });

    if (!user) {
        // For simulation, if user doesn't exist, create them.
        // This is where a full sign-up flow would be.
        let name;
        if(role === 'admin') name = 'Admin';
        else if(role === 'staff') name = 'New Staff';
        else name = 'New Customer';

        user = await User.create({
            name,
            phone,
            role,
        });
    }

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(401);
        throw new Error('Invalid user data');
    }
});

// @desc    Get all staff members
// @route   GET /api/users/staff
// @access  Private/Admin
const getStaffMembers = asyncHandler(async (req, res) => {
    const staff = await User.find({ role: 'staff' });
    res.json(staff);
});


export { authUser, getStaffMembers };
