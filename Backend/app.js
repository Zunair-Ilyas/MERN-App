const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3010
const cors = require("cors")
const connectDB = require("./Connect/MongoDB")
const routes = require('./Route/Routes')
const path = require('path')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
const allowedOrigins = ['https://d-and-d-nine.vercel.app', 'http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use('/', routes)


const start = () => {
    connectDB()
    app.listen(port, () => {
        console.log(`Server running on ${port}...`)
        console.log(path.join(__dirname, 'public'))
    })
}

start()