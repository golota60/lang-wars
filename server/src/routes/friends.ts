import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
import IUser from '../interfaces/IUser';
const router = express.Router();

interface sendRequestInterface {
  friendName: string;
}

router.post('/send-request', auth, async (req: any, res: express.Response) => {
  try {
    const requestBody: sendRequestInterface = { ...req.body };
    const user = await User.findById(req.user.id).select(
      'name friends sentInvitations receivedInvitations',
    );

    const friendToAdd = await User.findOne({
      name: requestBody.friendName,
    }).select('name friends sentInvitations receivedInvitations');

    if (!friendToAdd) {
      return res.status(400).json('User with that name does not exist');
    } else {
      if (
        user?.friends.find(userElem => userElem.name === friendToAdd.name) ||
        user?.sentInvitations.find(
          userElem => userElem.name === friendToAdd.name,
        )
      ) {
        return res
          .status(400)
          .json('This is already your friend or you sent an invite to them');
      }
      user?.sentInvitations.push({
        _id: friendToAdd._id,
        name: friendToAdd.name,
      } as IUser);
      friendToAdd?.receivedInvitations.push({
        _id: user?._id,
        name: user?.name,
      } as IUser);
    }

    user?.save();
    friendToAdd?.save();

    res.status(200).json('Friend added successfully');
  } catch (err) {
    console.error(`Error while saving friends ${err}`);
    res.status(400).json('');
  }
});

export { router as friendsRouter };
