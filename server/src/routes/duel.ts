import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
import IMatch from '../interfaces/IMatch';
import IUser from '../interfaces/IUser';
const router = express.Router();

interface AddDuelBody {
  language: string;
  enemyName: string;
  correctAnswers: number;
  isRandom: boolean;
}

router.post('/add', auth, async (req: any, res: express.Response) => {
  const requestBody: AddDuelBody = { ...req.body };
  const challeningUser = await User.findById(req.user.id);
  console.log('Challenging user:', challeningUser?.name);

  if (
    !requestBody.language ||
    (!requestBody.enemyName && !requestBody.isRandom)
  ) {
    return res
      .status(400)
      .json({ msg: 'Either language or enemyName were not provided' });
  }

  async function getRandomUser() {
    const randUser = await User.aggregate([{ $sample: { size: 1 } }]);
    console.log(randUser[0].name);
    if (randUser[0].name === challeningUser?.name) {
      getRandomUser();
    } else {
      return randUser[0];
    }
  }

  let enemyUser: any;
  if (requestBody.isRandom) {
    enemyUser = await getRandomUser();
    enemyUser = await User.findOne({ name: enemyUser.name });
  } else {
    enemyUser = await User.findOne({ name: requestBody.enemyName });
  }
  // const enemyUser: any = requestBody.isRandom
  //   ? await User.aggregate([{ $sample: { size: 1 } }])
  //   : await User.findOne({ name: requestBody.enemyName });
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
      (_elem: any) => JSON.stringify(_elem) === JSON.stringify(awaitingMatch),
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

router.post('/resolve-duel', auth, async (req: any, res: express.Response) => {
  const requestBody: ResolveDuelBody = { ...req.body };

  const enemyUser = await User.findOne({ name: requestBody.enemyName });
  const answeringUser = await User.findById(req.user.id);
});

interface DeclineDuelBody {
  enemyName: string;
}

router.post('/decline-duel', auth, async (req: any, res: express.Response) => {
  const reqeustBody: DeclineDuelBody = { ...req.body };
});

export { router as duelRouter };
