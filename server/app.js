const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors');

const path = require('path')

const router = require('./routes/routes')

const routerAPI = require('./routes/routesAPI')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.use(cors());

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

// app.use('/', router)

app.use('/', routerAPI)

// Connect to database
mongoose.connect("mongodb://localhost/movie")
let db = mongoose.connection;
// Check connection
db.once("open", () => {
    console.log("Connected to MongoDB")
})
// Check for DB errors
db.on("error", (err) => {
    console.log("DB error")
})

app.listen(8000, () => console.log('Server is running on PORT 8000'))
