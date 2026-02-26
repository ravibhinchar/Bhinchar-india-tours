const mongoose = require('mongoose');

const tourSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a tour title'],
            trim: true,
        },
        destination: {
            type: String,
            required: [true, 'Please add a destination'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
        },
        duration: {
            type: String,
            required: [true, 'Please add duration (e.g. 5D/4N)'],
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        rating: {
            type: Number,
            default: 4.5,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        category: {
            type: String,
            default: 'heritage'
        },
        highlights: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Tour', tourSchema);
