import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
const router = express.Router();

router.post('/add', auth, async (req: any, res: any) => {
  try {
    const friendName = req.body.friendName;
    const user = await User.findById(req.user.id);

    //Friend to be added cannot contain 'friends' array, otherwise it may enter circular dependency loop
    const friendToAdd = await User.findOne({ name: friendName }).select(
      '-friends',
    );

    if (!friendToAdd) {
      return res.status(400).json('User with that name does not exist');
    } else { 
      user?.friends.push(friendToAdd);
    }

    user?.save();

    res.status(200).json('Friend added successfully');
  } catch (err) {
    console.error(`Error while saving friends ${err}`);
    res.status(400).json('');
  }
});

export { router as friendsRouter };
