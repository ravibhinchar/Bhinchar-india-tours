const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const promoteUser = async () => {
    const email = 'bhincharravi@gmail.com'; // Target email
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.role = 'admin';
            await user.save();
            console.log(`SUCCESS: User ${user.name} (${email}) promoted to ADMIN.`);
        } else {
            console.log(`ERROR: User ${email} not found. Login with Google first to create the account.`);
        }
    } catch (error) {
        console.error(error);
    }
    process.exit();
};

promoteUser();
