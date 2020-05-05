import express from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth';
const router = express.Router();

interface SignUpInputBody {
  name: string;
  password: string;
  email: string;
}

interface SignUpOutputBody {
  id: string;
  name: string;
  email: string;
}

//PUBLIC
router.post('/signup', async (req: any, res: any) => {
  try {
    const userInfo: SignUpInputBody = req.body;

    //Check if provided body has all the fields
    if (!userInfo.name || !userInfo.password || !userInfo.email) {
      return res.status(400).json({ msg: 'All fields were not provided' });
    }

    //Check if user with given name/email already exists
    const existingUser =
      (await User.findOne({ name: userInfo.name })) ||
      (await User.findOne({ email: userInfo.email }));

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: 'User with that login or email already exists' });
    }

    const newUser = new User({
      name: userInfo.name,
      password: userInfo.password,
      email: userInfo.email,
      friends: [],
      sentInvitations: [],
      receivedInvitations: [],
    });

    //Sign a JWT token using user's ID
    const jwtToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!);

    const saltGen = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newUser.password, saltGen);
    newUser.password = hashPassword;

    //Save the created user
    const userSavingState = await newUser.save();

    //Create the user to return
    const userToReturn: SignUpOutputBody = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    //If the user has been saved correctly, return appropriate response
    if (userSavingState)
      return res.json({
        msg: 'User successfully added',
        user: userToReturn,
        token: jwtToken,
      });
  } catch (err) {
    console.error(err);
  }
});

interface SignInInputBody {
  email: string;
  password: string;
}

interface SignInOutputBody {
  id: string;
  name: string;
  email: string;
}

//PUBLIC
router.post('/signin', async (req: any, res: any) => {
  try {
    const userToLogIn: SignInInputBody = req.body;

    //If all the fields were not provided, return appropriate response
    if (!userToLogIn.email || !userToLogIn.password) {
      return res.status(400).json({ msg: 'All fields were not provided' });
    }

    //Find the user and if he does not exist, return appropriate response
    const existingUser = await User.findOne({ email: userToLogIn.email });
    if (!existingUser) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    //Check if password is correct, if it's not, return appropriate response
    const isPasswordCorrect = await bcrypt.compare(
      userToLogIn.password,
      existingUser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Wrong Email/Password' });
    }

    //Sign a token using user's id
    const jwtToken = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET!);

    const userToReturn: SignInOutputBody = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };

    return res.json({ msg: 'Login Successful', user: userToReturn, jwtToken });
  } catch (err) {
    console.error(err);
  }
});

//RESTRICTED
//Route returning a user
router.get('/user/home', auth, async (req: any, res: any) => {
  const user = await User.findById(req.user.id);

  user
    ? res.status(200).json(user)
    : res.status(400).json('Could not find user with provided ID');
});

//RESTRICTED
//Route used to check if user's token is correct
router.get('/user', auth, async (req: any, res: any) => {
  const user = await User.findById(req.user.id);
  user ? res.status(200).json('') : res.status(400).json('');
});

export { router as loginRouter };
