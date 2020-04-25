import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
const router = express.Router();

router.post('/add', auth, async (req: any, res: any) => {
  try {
    console.log(req.body.friendName);
    const { friendName } = req.body.friendName;
    const user = await User.findById(req.user._id);
    const friendToAdd = await User.findOne({ name: friendName });
    console.log('friendToadd', friendToAdd)

    if (!friendToAdd) {
      res.status(400).json('User with that name does not exist');
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
