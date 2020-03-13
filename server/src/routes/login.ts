import express from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/signup', async (req:any, res:any) => {
    try {
        const { name, password, email } = req.body;

        if (!name || !password || !email) return res.status(400).json({ msg: 'All fields were not provided' });

        const existingUser = await User.findOne({ name }) || await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User with that login or email already exists' });

        const newUser = new User({
            name: name,
            password: password,
            email: email
        })

        const jwtToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!);

        const saltGen = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newUser.password, saltGen);
        newUser.password = hashPassword;

        const userSavingState = await newUser.save();

        const userToReturn = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }

        if (userSavingState) return res.json({ msg: 'User successfully added', user: userToReturn, token: jwtToken });
    } catch (err) {
        console.log(err);
    }
})

router.post('/signin', async (req:any, res:any) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ msg: 'All fields were not provided' });

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(400).json({ msg: 'User does not exist' });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ msg: 'Wrong Email/Password' })

        const jwtToken = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!);

        const userToReturn = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
        }

        res.json({ msg: 'Login Successful', user: userToReturn, jwtToken });

    } catch (err) {
        console.log(err);
    }
})

router.get('/user', auth, async(req:any, res:any) => {
    const user = await User.findById(req.user.id);
    res.json(user);
})

export {router as loginRouter};