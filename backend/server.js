const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(express.json());
const corsOptions = {
    origin: [
        'http://localhost:5001',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'https://bhinchar-india-tours.vercel.app'
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('BhincharIndiaTours API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));



app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
