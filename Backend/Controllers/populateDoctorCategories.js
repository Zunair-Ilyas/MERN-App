const mongoose = require('mongoose');
const DoctorCategory = require('../Model/Doctor-Category-Schema'); // Update the path if necessary

mongoose.connect('mongodb+srv://Zunair:fNMv6Dj5fTCtz4AA@task-manager.hendyep.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    const doctorCategories = [
        {
            iconAddress: 'https://example.com/icons/ent.png',
            categoryName: 'ENT',
            availableDoctors: 10
        },
        {
            iconAddress: 'https://example.com/icons/dermatologist.png',
            categoryName: 'Dermatologist',
            availableDoctors: 8
        },
        {
            iconAddress: 'https://example.com/icons/cardiologist.png',
            categoryName: 'Cardiologist',
            availableDoctors: 5
        },
        {
            iconAddress: 'https://example.com/icons/pediatrician.png',
            categoryName: 'Pediatrician',
            availableDoctors: 12
        },
        {
            iconAddress: 'https://example.com/icons/orthopedic.png',
            categoryName: 'Orthopedic Surgeon',
            availableDoctors: 7
        },
        {
            iconAddress: 'https://example.com/icons/neurologist.png',
            categoryName: 'Neurologist',
            availableDoctors: 4
        },
        {
            iconAddress: 'https://example.com/icons/gynecologist.png',
            categoryName: 'Gynecologist',
            availableDoctors: 6
        },
        {
            iconAddress: 'https://example.com/icons/oncologist.png',
            categoryName: 'Oncologist',
            availableDoctors: 3
        },
        {
            iconAddress: 'https://example.com/icons/psychiatrist.png',
            categoryName: 'Psychiatrist',
            availableDoctors: 9
        },
        {
            iconAddress: 'https://example.com/icons/opthalmologist.png',
            categoryName: 'Ophthalmologist',
            availableDoctors: 5
        }
    ];

    DoctorCategory.insertMany(doctorCategories)
        .then(docs => {
            console.log('Doctor categories inserted:', docs);
            mongoose.connection.close();
        })
        .catch(err => {
            console.error('Error inserting doctor categories:', err);
            mongoose.connection.close();
        });
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});
