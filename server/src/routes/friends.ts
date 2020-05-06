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
        ) ||
        user?.name === friendToAdd.name
      ) {
        return res
          .status(400)
          .json(
            'This is already your friend or you sent an invite to them or this may be you',
          );
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
    console.error(`Error while sending invitation: ${err}`);
    return res.status(400).json('');
  }
});

router.post(
  '/accept-request',
  auth,
  async (req: any, res: express.Response) => {
    try {
      const requestBody: sendRequestInterface = { ...req.body };

      const friendToAccept = await User.findOne({
        name: requestBody.friendName,
      }).select('name friends sentInvitations receivedInvitations');

      const user = await User.findById(req.user.id).select(
        'name friends sentInvitations receivedInvitations',
      );

      user?.friends.push({
        _id: friendToAccept?._id,
        name: friendToAccept?.name,
      } as IUser);

      friendToAccept?.friends.push({
        _id: user?._id,
        name: user?.name,
      } as IUser);

      const friendToAcceptName = friendToAccept?.name;
      const userName = user?.name;

      user?.receivedInvitations.splice(
        user?.receivedInvitations.findIndex(userInfo => {
          userInfo.name === friendToAcceptName;
        }),
        1,
      );
      friendToAccept?.sentInvitations.splice(
        friendToAccept?.sentInvitations.findIndex(userInfo => {
          userInfo.name === userName;
        }),
        1,
      );

      user?.save();
      friendToAccept?.save();
      res.status(200).json('Friend accepted successfully');
    } catch (err) {
      console.error(`Error while accepting invitation: ${err}`);
      return res.status(400).json('');
    }
  },
);

router.post(
  '/decline-request',
  auth,
  async (req: any, res: express.Response) => {
    try {
      const requestBody: sendRequestInterface = { ...req.body };

      const friendToDecline = await User.findOne({
        name: requestBody.friendName,
      }).select('name friends sentInvitations receivedInvitations');

      const user = await User.findById(req.user.id).select(
        'name friends sentInvitations receivedInvitations',
      );

      const friendToDeclineName = friendToDecline?.name;
      const userName = user?.name;

      user?.receivedInvitations.splice(
        user?.receivedInvitations.findIndex(userInfo => {
          userInfo.name === friendToDeclineName;
        }),
        1,
      );

      friendToDecline?.sentInvitations.splice(
        friendToDecline?.sentInvitations.findIndex(userInfo => {
          userInfo.name === userName;
        }),
        1,
      );

      user?.save();
      friendToDecline?.save();

      res.status(200).json('Friend declined successfully');
    } catch (err) {
      console.error(`Error while accepting invitation: ${err}`);
      return res.status(400).json('');
    }
  },
);

router.post('/delete-friend', auth, async (req: any, res: any) => {
  try {
    const requestBody: sendRequestInterface = { ...req.body };

    const friendToDecline = await User.findOne({
      name: requestBody.friendName,
    }).select('name friends sentInvitations receivedInvitations');

    const user = await User.findById(req.user.id).select(
      'name friends sentInvitations receivedInvitations',
    );

    const friendToDeclineName = friendToDecline?.name;
    const userName = user?.name;

    user?.friends.splice(
      user?.friends.findIndex(userInfo => {
        userInfo.name === friendToDeclineName;
      }),
      1,
    );

    friendToDecline?.friends.splice(
      friendToDecline?.friends.findIndex(userInfo => {
        userInfo.name === userName;
      }),
      1,
    );

    user?.save();
    friendToDecline?.save();

    res.status(200).json('Friend deleted successfully');
  } catch (err) {
    console.error(`Error while deleting friend: ${err}`);
    return res.status(400).json('');
  }
});

export { router as friendsRouter };
