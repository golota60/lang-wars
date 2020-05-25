import express from 'express';
import logger from './middleware/logger';
import cors from 'cors';
import mongoose from 'mongoose';
import { loginRouter } from './routes/login';
import { friendsRouter } from './routes/friends';
import { duelRouter } from './routes/duel';
import User from './models/User';
import {
  PolishQuestion,
  ItalianQuestion,
  EnglishQuestion,
  GermanQuestion,
} from './models/Question';
import { questionRouter } from './routes/question';
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const URI = process.env.LOCAL_URI!;

app.use(logger);
app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter);
app.use('/api/user/friends', friendsRouter);
app.use('/api/user/duels', duelRouter);
app.use('/api/questions', questionRouter);

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const mongooseConnection = mongoose.connection;

mongooseConnection.once('open', () => {
  console.log('Connection with MongoDB established successfully');
});

app.listen(PORT, () => {
  console.log(`Server has started and is listening on port ${PORT}...`);
});

app.get('/', async (req: any, res: any) => {
  const allUsers = await User.find({});
  console.log(allUsers);

  const polishQuestions = await PolishQuestion.find({});
  console.log(polishQuestions);

  const italianQuestions = await ItalianQuestion.find({});
  console.log(italianQuestions);

  const germanQuestions = await GermanQuestion.find({});
  console.log(germanQuestions);

  const englishQuestions = await EnglishQuestion.find({});
  console.log(englishQuestions);

  return res.send('<h1>Server Works!</h1>');
});
