const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    DOB: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\+92-\d{3}-\d{7}$/, 'Please use a valid contact number format: +92-XXX-XXXXXXX']
    },
    address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true,
        match: [/^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/, 'Please use a valid time format: HH:MM']
    },
    doctor_email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    doctor_address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    doctor_specialization: {
        type: String,
        required: true
    },
    doctor_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    },
    doctor_contact: {
        type: String,
        required: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
