const express = require('express');
const sequelize = require('./utils/db');
const cors = require('cors')
const user = require('./model/user');
const receiver = require('./model/receiver');
const sender = require('./model/sender');
const device_status = require('./model/device_status');

const app = express();

app.use(express.json());

app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH');
    next()
});

//ROUTES
app.use('/user', require('./routes/user'));
app.use('/receiver', require('./routes/receiver'));
app.use('/sender', require('./routes/sender'));
app.use('/device_status', require('./routes/device_status'));

//ERROR HANDLING
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message:message});
});

//SYNC DATABASE
sequelize.sync()
    .then(result => {
        console.log('Database connected successfully');
        app.listen(process.env.PORT || 8080)
    })
    .catch(err => console.log(err));