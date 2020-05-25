import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
import IMatch from '../interfaces/IMatch';
const router = express.Router();

interface AddDuelBody {
  language: string;
  enemyName: string;
  correctAnswers: number;
}

router.post('/add', auth, async (req: any, res: express.Response) => {
  const requestBody: AddDuelBody = { ...req.body };

  if (!requestBody.language || !requestBody.enemyName) {
    return res
      .status(400)
      .json({ msg: 'Either language or enemyName were not provided' });
  }

  const enemyUser = await User.findOne({ name: requestBody.enemyName });
  const challeningUser = await User.findById(req.user.id);
  console.log('Challenging user:', challeningUser?.name);
  console.log('Enemy user:', enemyUser?.name);

  const challengingMatch: IMatch = {
    enemyName: enemyUser!.name!,
    language: requestBody.language,
    outcome: 'NEW',
    yourCorrectAnswers: requestBody.correctAnswers,
    enemyCorrectAnswers: -1,
  };

  if (
    challeningUser?.sentDuels.some(
      _elem => JSON.stringify(_elem) === JSON.stringify(challengingMatch),
    )
  ) {
    return res.status(400).json({ msg: 'You sent exact same duel' });
  }
  await challeningUser?.sentDuels.push(challengingMatch);

  const awaitingMatch: IMatch = {
    enemyName: challeningUser!.name!,
    language: requestBody.language,
    outcome: 'NEW',
    yourCorrectAnswers: -1,
    enemyCorrectAnswers: requestBody.correctAnswers,
  };

  if (
    enemyUser?.awaitingDuels.some(
      _elem => JSON.stringify(_elem) === JSON.stringify(awaitingMatch),
    )
  ) {
    return res.status(400).json({
      msg:
        'Your opponent already has that duel - but you dont so somethings wrong',
    });
  }
  await enemyUser?.awaitingDuels.push(awaitingMatch);

  challeningUser?.save();
  enemyUser?.save();

  return res.status(200).json({ msg: 'Duel sent successfully' });
});

interface ResolveDuelBody {
  enemyName: string;
  correctAnswers: number;
}

router.post(
  '/resolve-duel',
  auth,
  async (req: any, res: express.Response) => {
    const requestBody: ResolveDuelBody = { ...req.body };

    const enemyUser = await User.findOne({ name: requestBody.enemyName });
    const answeringUser = await User.findById(req.user.id);

  }
);

interface DeclineDuelBody {
  enemyName: string;
}

router.post(
  '/decline-duel',
  auth,
  async (req: any, res: express.Response) => {
    const reqeustBody: DeclineDuelBody = { ...req.body };

  }
);

export { router as duelRouter };
