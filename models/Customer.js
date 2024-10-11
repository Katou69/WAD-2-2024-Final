import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    memberNumber: {
        type: Number,
        unique: true,  // Ensures each member has a unique number
        required: true,
    },
    interests: {
        type: String,
        required: true,
    },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
export default Customer;
