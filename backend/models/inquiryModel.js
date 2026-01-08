const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema(
    {
        destination: { type: String, required: true },
        people: { type: Number, required: true },
        checkin: { type: Date, required: true },
        checkout: { type: Date, required: true },
        // Optional: User contact info if logged in or gathered from form?
        // The current form doesn't ask for email/name, but usually inquiries need contact info.
        // I will assume for now we might add user context if logged in, otherwise it's anonymous?
        // Wait, the form has no contact fields! It's just destination, pax, dates.
        // I should probably prompt the user to add contact info or assume logged in.
        // If not logged in, inquiry is useless without contact.
        // User asked "inquire should reach to the admin panel".
        // I'll add user ID if logged in, or maybe just proceed with what we have.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false // Optional for now
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Inquiry', inquirySchema);
