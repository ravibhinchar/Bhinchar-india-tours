const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);

        // Check if MONGO_URI is missing (Common first-time error)
        if (!process.env.MONGO_URI) {
            console.error("FATAL: MONGO_URI is not defined in .env file.");
        }

        process.exit(1);
    }
};

module.exports = connectDB;
