const mongoose = require('mongoose');
const Doctor = require('../Model/Doctor-Schema') // Update the path if necessary

mongoose.connect('mongodb+srv://Zunair:fNMv6Dj5fTCtz4AA@task-manager.hendyep.mongodb.net/?retryWrites=true&w=majority&appName=Task-Manager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

    const doctor = [
        {
            "firstName": "John",
            "lastName": "Doe",
            "gender": "Male",
            "specialization": "Cardiologist",
            "languageSpoken": ["English", "Spanish"],
            "address": "123 Main St, Anytown, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "123-456-7890",
            "email": "johndoe@example.com",
            "profilePic": "https://unsplash.com/photos/AOhO4Yv3UbM"
        },
        {
            "firstName": "Jane",
            "lastName": "Smith",
            "gender": "Female",
            "specialization": "Dermatologist",
            "languageSpoken": ["English"],
            "address": "456 Elm St, Anycity, USA",
            "availableHours": "10am - 6pm",
            "contactNumber": "987-654-3210",
            "email": "janesmith@example.com",
            "profilePic": "https://unsplash.com/photos/tP3zTTYhsuY"
        },
        {
            "firstName": "Robert",
            "lastName": "Brown",
            "gender": "Male",
            "specialization": "ENT Specialist",
            "languageSpoken": ["English", "French"],
            "address": "789 Oak St, Anyville, USA",
            "availableHours": "8am - 4pm",
            "contactNumber": "456-789-1234",
            "email": "robertbrown@example.com",
            "profilePic": "https://unsplash.com/photos/5p5zlHEnW8c"
        },
        {
            "firstName": "Emily",
            "lastName": "Johnson",
            "gender": "Female",
            "specialization": "Cardiologist",
            "languageSpoken": ["English", "German"],
            "address": "101 Pine St, Anyborough, USA",
            "availableHours": "11am - 7pm",
            "contactNumber": "321-654-9870",
            "email": "emilyjohnson@example.com",
            "profilePic": "https://unsplash.com/photos/JvA8Krwv7rs"
        },
        {
            "firstName": "Michael",
            "lastName": "Lee",
            "gender": "Male",
            "specialization": "Neurologist",
            "languageSpoken": ["English", "Chinese"],
            "address": "202 Birch St, Anyhamlet, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "789-123-4567",
            "email": "michaellee@example.com",
            "profilePic": "https://unsplash.com/photos/cQfKtivhGu8"
        },
        {
            "firstName": "Sarah",
            "lastName": "Davis",
            "gender": "Female",
            "specialization": "Oncologist",
            "languageSpoken": ["English", "Italian"],
            "address": "303 Maple St, Anyshire, USA",
            "availableHours": "8am - 4pm",
            "contactNumber": "654-321-7890",
            "email": "sarahdavis@example.com",
            "profilePic": "https://unsplash.com/photos/7oez5FVmXgo"
        },
        {
            "firstName": "David",
            "lastName": "Martinez",
            "gender": "Male",
            "specialization": "Ophthalmologist",
            "languageSpoken": ["English", "Spanish"],
            "address": "404 Cedar St, Anyport, USA",
            "availableHours": "10am - 6pm",
            "contactNumber": "321-987-6543",
            "email": "davidmartinez@example.com",
            "profilePic": "https://unsplash.com/photos/eLCsSJo_plM"
        },
        {
            "firstName": "Laura",
            "lastName": "Hernandez",
            "gender": "Female",
            "specialization": "Orthopedic Surgeon",
            "languageSpoken": ["English", "Portuguese"],
            "address": "505 Walnut St, Anytown, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "987-123-4567",
            "email": "laurahernandez@example.com",
            "profilePic": "https://unsplash.com/photos/zh-C8dFrArA"
        },
        {
            "firstName": "James",
            "lastName": "Clark",
            "gender": "Male",
            "specialization": "Pediatrician",
            "languageSpoken": ["English", "Spanish"],
            "address": "606 Chestnut St, Anycity, USA",
            "availableHours": "8am - 4pm",
            "contactNumber": "123-789-4560",
            "email": "jamesclark@example.com",
            "profilePic": "https://unsplash.com/photos/HwDVG8i_f1A"
        },
        {
            "firstName": "Olivia",
            "lastName": "Lewis",
            "gender": "Female",
            "specialization": "Psychiatrist",
            "languageSpoken": ["English", "French"],
            "address": "707 Willow St, Anyville, USA",
            "availableHours": "11am - 7pm",
            "contactNumber": "456-123-7890",
            "email": "olivialewis@example.com",
            "profilePic": "https://unsplash.com/photos/IyoVwCkJaQE"
        },
        {
            "firstName": "William",
            "lastName": "Walker",
            "gender": "Male",
            "specialization": "Pediatrician",
            "languageSpoken": ["English", "German"],
            "address": "808 Ash St, Anyborough, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "789-456-1230",
            "email": "williamwalker@example.com",
            "profilePic": "https://unsplash.com/photos/Smk2Vgy1hm4"
        },
        {
            "firstName": "Sophia",
            "lastName": "Robinson",
            "gender": "Female",
            "specialization": "Ophthalmologist",
            "languageSpoken": ["English", "Italian"],
            "address": "909 Poplar St, Anyhamlet, USA",
            "availableHours": "10am - 6pm",
            "contactNumber": "654-987-3210",
            "email": "sophiarobinson@example.com",
            "profilePic": "https://unsplash.com/photos/fzOITuS1DIQ"
        },
        {
            "firstName": "Daniel",
            "lastName": "Young",
            "gender": "Male",
            "specialization": "Cardiologist",
            "languageSpoken": ["English", "Spanish"],
            "address": "1010 Beech St, Anyshire, USA",
            "availableHours": "8am - 4pm",
            "contactNumber": "321-456-7890",
            "email": "danielyoung@example.com",
            "profilePic": "https://unsplash.com/photos/77d0YPwF9I4"
        },
        {
            "firstName": "Grace",
            "lastName": "Allen",
            "gender": "Female",
            "specialization": "Dermatologist",
            "languageSpoken": ["English"],
            "address": "1111 Hemlock St, Anyport, USA",
            "availableHours": "11am - 7pm",
            "contactNumber": "987-654-3210",
            "email": "graceallen@example.com",
            "profilePic": "https://unsplash.com/photos/lk8pxwJsIlo"
        },
        {
            "firstName": "Matthew",
            "lastName": "King",
            "gender": "Male",
            "specialization": "ENT Specialist",
            "languageSpoken": ["English", "French"],
            "address": "1212 Linden St, Anytown, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "456-789-1234",
            "email": "matthewking@example.com",
            "profilePic": "https://unsplash.com/photos/RF4pvc0sR7g"
        },
        {
            "firstName": "Chloe",
            "lastName": "Scott",
            "gender": "Female",
            "specialization": "Orthopedic Surgeon",
            "languageSpoken": ["English", "German"],
            "address": "1313 Magnolia St, Anycity, USA",
            "availableHours": "8am - 4pm",
            "contactNumber": "321-654-9870",
            "email": "chloescott@example.com",
            "profilePic": "https://unsplash.com/photos/R6by84vf_AA"
        },
        {
            "firstName": "Ethan",
            "lastName": "Green",
            "gender": "Male",
            "specialization": "Neurologist",
            "languageSpoken": ["English", "Chinese"],
            "address": "1414 Cedar St, Anyville, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "789-123-4567",
            "email": "ethangreen@example.com",
            "profilePic": "https://unsplash.com/photos/YD_aM0PVIdw"
        },
        {
            "firstName": "Ava",
            "lastName": "Baker",
            "gender": "Female",
            "specialization": "Oncologist",
            "languageSpoken": ["English", "Italian"],
            "address": "1515 Fir St, Anyborough, USA",
            "availableHours": "8am - 4pm",
            "contactNumber": "654-321-7890",
            "email": "avabaker@example.com",
            "profilePic": "https://unsplash.com/photos/KC_5PKajS-Y"
        },
        {
            "firstName": "Joseph",
            "lastName": "Harris",
            "gender": "Male",
            "specialization": "Ophthalmologist",
            "languageSpoken": ["English", "Spanish"],
            "address": "1616 Pine St, Anyhamlet, USA",
            "availableHours": "10am - 6pm",
            "contactNumber": "321-987-6543",
            "email": "josephharris@example.com",
            "profilePic": "https://unsplash.com/photos/tGtvkHwNGDY"
        },
        {
            "firstName": "Isabella",
            "lastName": "Nelson",
            "gender": "Female",
            "specialization": "Orthopedic Surgeon",
            "languageSpoken": ["English", "Portuguese"],
            "address": "1717 Spruce St, Anyshire, USA",
            "availableHours": "9am - 5pm",
            "contactNumber": "987-123-4567",
            "email": "isabellanelson@example.com",
            "profilePic": "https://plus.unsplash.com/premium_photo-1674978723656-6b0ee188a014"
        }
    ]

    Doctor.insertMany(doctor)
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