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
app.use(cors({
    origin: ['https://d-and-d-backend.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use('/', routes)


const start = () => {
    connectDB()
    app.listen(port, () => {
        console.log(`Server running on ${port}...`)
        console.log(path.join(__dirname, 'public'))
    })
}

start()