import express from 'express';
import auth from '../middleware/auth';
import User from '../models/User';
import IMatch from '../interfaces/IMatch';
const router = express.Router();

interface AddDuelBody {
  language: string;
  enemyName: string;
  correctAnswers: number;
  isRandom: boolean;
}

router.post('/add', auth, async (req: any, res: express.Response) => {
  const requestBody: AddDuelBody = { ...req.body };
  console.log(requestBody);
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

  async function getRandomUser(): Promise<any> {
    const randUser = await User.aggregate([{ $sample: { size: 1 } }]);
    console.log(randUser[0].name);
    if (randUser[0].name === challeningUser?.name) {
      return await getRandomUser();
    } else {
      return randUser[0];
    }
  }

  let enemyUser: any;
  if (requestBody.isRandom) {
    enemyUser = await getRandomUser();
    if (!enemyUser) {
      return res.json('something went wrong');
    }
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
  language: string;
  correctAnswers: number;
}

router.post('/resolve-duel', auth, async (req: any, res: express.Response) => {
  const requestBody: ResolveDuelBody = { ...req.body };

  const enemyUser = await User.findOne({ name: requestBody.enemyName });
  let answeringUser = await User.findById(req.user.id);

  let duelToResolve = await answeringUser?.awaitingDuels.find(
    _match =>
      _match.language === requestBody.language &&
      _match.enemyName === requestBody.enemyName,
  );

  if (!duelToResolve) {
    return res.status(200).json({ msg: "That match doesn't exist" });
  }

  const outcome1 = ((): string => {
    let ans = '';
    if (requestBody.correctAnswers > duelToResolve?.enemyCorrectAnswers!) {
      ans = 'WON';
    } else if (
      requestBody.correctAnswers < duelToResolve?.enemyCorrectAnswers!
    ) {
      ans = 'LOST';
    } else {
      ans = 'DRAW';
    }
    return ans;
  })();

  const newMatch: IMatch = {
    enemyName: enemyUser!.name!,
    language: duelToResolve?.language!,
    outcome: outcome1,
    yourCorrectAnswers: requestBody.correctAnswers,
    enemyCorrectAnswers: duelToResolve?.enemyCorrectAnswers!,
  };

  answeringUser?.awaitingDuels.splice(
    answeringUser.awaitingDuels.indexOf(duelToResolve!),
    1,
  );
  answeringUser?.matchHistory.push(newMatch);
  switch (outcome1) {
    case 'WON':
      answeringUser!.wins! += 1;
      break;
    case 'LOST':
      answeringUser!.losses! += 1;
      break;
    case 'DRAW':
      answeringUser!.draws! += 1;
      break;
    default:
      break;
  }
  await answeringUser?.save();

  let duelToResolve2 = await enemyUser?.sentDuels.find(
    _match =>
      _match.language === requestBody.language &&
      _match.enemyName === answeringUser?.name!,
  );

  const outcome2 = ((): string => {
    let ans = '';
    if (outcome1 === 'WON') {
      ans = 'LOST';
    } else if (outcome1 === 'LOST') {
      ans = 'WON';
    } else {
      ans = 'DRAW';
    }
    return ans;
  })();

  const newMatch2: IMatch = {
    enemyName: answeringUser!.name!,
    language: duelToResolve2?.language!,
    outcome: outcome2,
    yourCorrectAnswers: duelToResolve2?.yourCorrectAnswers!,
    enemyCorrectAnswers: requestBody.correctAnswers,
  };

  console.log(duelToResolve2);

  enemyUser?.sentDuels.splice(enemyUser.sentDuels.indexOf(duelToResolve2!), 1);
  enemyUser?.matchHistory.push(newMatch2);
  switch (outcome2) {
    case 'WON':
      enemyUser!.wins! += 1;
      break;
    case 'LOST':
      enemyUser!.losses! += 1;
      break;
    case 'DRAW':
      enemyUser!.draws! += 1;
      break;
    default:
      break;
  }
  await enemyUser?.save();

  return res.json('Success');
});

interface DeclineDuelBody {
  enemyName: string;
  language: string;
}

router.post('/decline-duel', auth, async (req: any, res: express.Response) => {
  const requestBody: DeclineDuelBody = { ...req.body };

  const enemyUser = await User.findOne({ name: requestBody.enemyName });
  let answeringUser = await User.findById(req.user.id);

  let duelToResolve = await answeringUser?.awaitingDuels.find(
    _match =>
      _match.language === requestBody.language &&
      _match.enemyName === requestBody.enemyName,
  );
  if (!duelToResolve) {
    return res.status(200).json({ msg: "That match doesn't exist" });
  }

  answeringUser?.awaitingDuels.splice(
    answeringUser.awaitingDuels.indexOf(duelToResolve!),
    1,
  );
  await answeringUser?.save();

  let duelToResolve2 = await enemyUser?.sentDuels.find(
    _match =>
      _match.language === requestBody.language &&
      _match.enemyName === answeringUser?.name!,
  );

  console.log(duelToResolve2);

  enemyUser?.sentDuels.splice(enemyUser.sentDuels.indexOf(duelToResolve2!), 1);
  await enemyUser?.save();

  return res.json('Success');
});

export { router as duelRouter };
