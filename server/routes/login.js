const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    const { login, password } = req.body;

    if(!login || !password) {
        res.status('400').json('All fields were not provided');
    }

    User.findOne({ login })
        .then((user) => {
            if (user) {
                res.status('400').json('User with that login already exists')
            } else {

                const newUser = new User({
                    login: login,
                    password: password
                })

                newUser.save()
                    .then(() => {
                        res.json('User successfully added');
                    })
                    .catch(err => {
                        res.status('400').json(`Error: ${err}`)
                    })
            }
        })
})

router.get('/signin', (req, res) => {
    res.send('signin')
})


module.exports = router;