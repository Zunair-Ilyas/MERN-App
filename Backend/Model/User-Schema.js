const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [20, 'Must not be more than 20 characters'],
        minlength: [3, 'Must be at least 3 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [20, 'Must not be more than 20 characters'],
        minlength: [3, 'Must be at least 3 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Must be at least 4 characters'],
    },
})

module.exports = mongoose.model('User', UserSchema);