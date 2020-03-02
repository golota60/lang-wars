const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//This class has comments only for the purpose of being an example class for other contributors to base on

//This endpoint responds to '/api/login/signup' because in the server.js file we declare that
router.post('/signup', async (req, res) => {
    try {
        /*Get login and password from the body of the request and store them in 'login' and 'password' variables respectively
        For more on object destructuring (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)*/
        const { login, password } = req.body;

        //Check if both login and password were provided
        if (!login || !password) res.status(400).json('All fields were not provided');

        /*We use the findOne() method from Mongoose Model API to check if user exists
        Mongoose docs(https://mongoosejs.com/docs/api/model.html#model_Model.findOne)
        If the user login is found then the promise returns an existing user, in which case we return a 400 status*/
        const existingUser = await User.findOne({ login });
        if (existingUser) return res.status(400).json('User with that login already exists');

        //We create a new instance of used based on our User model which is declared in the /models/User.js file
        const newUser = new User({
            login: login,
            password: password
        })

        //Generating salt and hashing the password using the bcrypt library(https://www.npmjs.com/package/bcrypt)
        const saltGen = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, saltGen);
        newUser.password = hashPassword;

        /* We use the save() method from Mongoose Model API to save the use to the database
        Mongoose docs(https://mongoosejs.com/docs/api/model.html#model_Model-save)*/
        const userSavingState = await newUser.save();
        if (userSavingState) return res.json('User successfully added');
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}) 