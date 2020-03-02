const mongoose = require('mongoose');

/*
This file has comments because it's and example file
It is starting with a capital letter because it's a model
*/

//Here, we create a new Schema(Model) for our database, so all users look the same
const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User;