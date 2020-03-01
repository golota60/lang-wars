const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

//Here we use dotenv library to load all the environment variables from the .env file
require('dotenv').config();

//Port on which the app is going to be running on - for local development its 5000 since the process.env.PORT doesn't exist
const PORT = process.env.PORT || 5000;
//Assign the value from the .env file to a JS constant
const URI = process.env.LOCAL_URI;

//Middleware which is going to log every separate hit to our database
app.use(logger);
//Body-parser middleware for MongoDB. Docs(https://expressjs.com/en/api.html#express.json)
app.use(express.json());

//Not initialized middleware - in the future it's going to be used to bypass the CORS limitations
// app.use(cors());

//Declare the endpoints and the corresponding file
app.use('/api/login', require('./routes/login'))

//Connect to out MongoDB 
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const mongooseConnection = mongoose.connection;

//Once the connection is open, log that to the console
mongooseConnection.once('open', () => {
    console.log('Connection with MongoDB established successfully');
})

//Start the server
app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}...`);
})

//Dummy endpoint to see if the server is working
app.get('/', (req, res) => {
    res.send('<h1>Server Works!</h1>');
});
