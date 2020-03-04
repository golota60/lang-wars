const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URI = process.env.LOCAL_URI;

app.use(logger);
app.use(express.json());
// app.use(cors());

app.use('/api/login', require('./routes/login'))

mongoose.set('debug', true);
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const mongooseConnection = mongoose.connection;

mongooseConnection.once('open', () => {
    console.log('Connection with MongoDB established successfully');
})

app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}...`);
})

app.get('/', (req, res) => {
    res.send('<h1>Server Works!</h1>');
});
