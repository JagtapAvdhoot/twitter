const express = require("express");
const compression = require("compression");
const cors = require('cors');
const helmet = require('helmet');
const moment = require("moment");
const morgan = require("morgan");
const socket = require('socket.io')

const router = require('./route');
const notFoundHandler = require('./handler/notFound');
const errorHandler = require('./handler/errorHandler');
const db = require('./model');

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(cors())
app.use(compression())

app.get('/', (req, res) => {
    res.send('twitter clone api bitch')
})

app.use("/api", router)

app.use(notFoundHandler)

app.use(errorHandler)

module.exports = app;