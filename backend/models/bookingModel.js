const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        tourTitle: {
            type: String,
            required: true,
        },
        tourId: {
            type: String, // Or ObjectId if you linked it to Tour model strictly
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Pending', // Pending, Confirmed, Cancelled
        },
        bookingDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
