const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    specialization: {
        type: String,
        required: true,
        enum: ['Cardiologist', 'Dermatologist', 'ENT Specialist', 'Neurologist', 'Oncologist', 'Ophthalmologist', 'Orthopedic Surgeon', 'Pediatrician', 'Psychiatrist', 'Gynecologist']
    },
    languageSpoken: {
        type: [String],
        required: true
    },
    address: {
        type: String,
        required: true
    },
    availableHours: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
