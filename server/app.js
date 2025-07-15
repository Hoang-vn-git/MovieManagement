const express = require('express')

const cors = require('cors');

const path = require('path')

const router = require('./routes/routes')

const routerAPI = require('./routes/routesAPI')

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cors());

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, 'views'))

// app.use('/', router)

app.use('/', routerAPI)

app.listen(8000, () => console.log('Server is running on PORT 8000'))
