const mongoose = require('mongoose');

const doctorCategorySchema = new mongoose.Schema({
    iconAddress: {
        type: String,
        required: true,
        trim: true,
        description: "URL of the icon representing the doctor category"
    },
    categoryName: {
        type: String,
        required: true,
        trim: true,
        description: "Name of the doctor category"
    },
    availableDoctors: {
        type: Number,
        required: true,
        min: 0,
        description: "Number of doctors available in this category"
    }
});

const DoctorCategory = mongoose.model('DoctorCategory', doctorCategorySchema);

module.exports = DoctorCategory;
