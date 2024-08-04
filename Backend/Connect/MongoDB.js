const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;

const connectDB = () => {
    mongoose.connect(connectionString)
    console.log("MongoDB Connected Successfully!")
}

module.exports = connectDB;