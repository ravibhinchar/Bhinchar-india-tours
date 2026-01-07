const express = require('express');
// Trigger Nodemon Restart
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON data
app.use(cors()); // Enable CORS

app.get('/', (req, res) => {
    res.send('BhincharIndiaTours API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));



// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
// Force redeploy timestamp
