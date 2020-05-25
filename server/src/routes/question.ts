/* eslint-disable no-case-declarations */
import express from 'express';
import auth from '../middleware/auth';
import {
  GermanQuestion,
  ItalianQuestion,
  EnglishQuestion,
  PolishQuestion,
} from '../models/Question';
const router = express.Router();

interface GetQuestionsInterface {
  numberOfQuestions: number;
  language: 'german' | 'italian' | 'english' | 'polish';
}

router.post('/get-questions', async (req: any, res: express.Response) => {
  const reqeustBody: GetQuestionsInterface = { ...req.body };
  const questionAmount = reqeustBody.numberOfQuestions;

  switch (reqeustBody.language) {
    case 'german':
      const germanQuestions = await GermanQuestion.aggregate([
        { $sample: { size: questionAmount } },
      ]);
      console.log(germanQuestions);
      return res.json(germanQuestions);
    case 'italian':
      const italianQuestions = await ItalianQuestion.aggregate([
        { $sample: { size: questionAmount } },
      ]);
      console.log(italianQuestions);
      return res.json(italianQuestions);
    case 'english':
      const englishQuestions = await EnglishQuestion.aggregate([
        { $sample: { size: questionAmount } },
      ]);
      console.log(englishQuestions);
      return res.json(englishQuestions);
    case 'polish':
      const polishQuestions = await PolishQuestion.aggregate([
        { $sample: { size: questionAmount } },
      ]);
      console.log(polishQuestions);
      return res.json(polishQuestions);

    default:
      return res.status(400).json({ msg: 'There is no such language' });
  }
});

export { router as questionRouter };
