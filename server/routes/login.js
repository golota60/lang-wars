const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    try {
        const { login, password, email } = req.body;

        if (!login || !password || !email) return res.status(400).json('All fields were not provided');

        const existingUser = await User.findOne({ login }) || await User.findOne({ email });
        if (existingUser) return res.status(400).json('User with that login or email already exists');

        const newUser = new User({
            login: login,
            password: password,
            email: email
        })

        newUser.token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 });

        const saltGen = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, saltGen);
        newUser.password = hashPassword;

        const userSavingState = await newUser.save();
        if (userSavingState) return res.json('User successfully added');
    } catch (e) {
        console.log(e);
    }
})

router.get('/signin', (req, res) => {
    res.send('signin')
})


module.exports = router;