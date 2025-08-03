const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors');

const path = require('path')

const passport = require('passport')

const router = require('./routes/routes')

const routerAPI = require('./routes/routesAPI')

const cookieParser = require('cookie-parser')


const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(cors({
    origin: 'https://movie-management-six.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

require('./config/passport')(passport);

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

// app.use('/', router)

app.use('/', routerAPI)

// Connect to database
mongoose.connect("mongodb+srv://Cluster03955:fVVMbVhuXHlj@movies.p2w6cgw.mongodb.net/movie?retryWrites=true&w=majority&appName=movies")

let db = mongoose.connection;
// Check connection
db.once("open", () => {
    console.log("Connected to MongoDB")
})
// Check for DB errors
db.on("error", (err) => {
    console.log("DB error")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});