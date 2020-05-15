import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
import IMatch from '../interfaces/IMatch';
const router = express.Router();

interface addDuelBody {
  language: string;
  enemyName: string;
}

router.post('/add', auth, async (req: any, res: express.Response) => {
  const reqeustBody: addDuelBody = { ...req.body };

  if (!reqeustBody.language || !reqeustBody.enemyName) {
    return res
      .status(400)
      .json({ msg: 'Either language or enemyName were not provided' });
  }

  const enemyUser = await User.findOne({ name: reqeustBody.enemyName });
  const challeningUser = await User.findById(req.user.id);
  console.log('Challenging user:', challeningUser?.name);
  console.log('Enemy user:', enemyUser?.name);

  const challengingMatch: IMatch = {
    enemyName: enemyUser!.name!,
    language: reqeustBody.language,
    outcome: 'NEW',
  };

  await challeningUser?.sentDuels.push(challengingMatch);

  const awaitingMatch: IMatch = {
    enemyName: challeningUser!.name!,
    language: reqeustBody.language,
    outcome: 'NEW',
  };

  await enemyUser?.awaitingDuels.push(awaitingMatch);

  challeningUser?.save();
  enemyUser?.save();

  return res.status(200).json({ msg: 'Duel sent successfully' });
});

export { router as duelRouter };
