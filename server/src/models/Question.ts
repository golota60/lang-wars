import mongoose from 'mongoose';
import IQuestion from '../interfaces/IQuestion';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  A: {
    type: String,
    required: true,
  },
  B: {
    type: String,
    required: true,
  },
  C: {
    type: String,
    required: true,
  },
  D: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

export const PolishQuestion = mongoose.model<IQuestion>(
  'PolishQuestion',
  QuestionSchema,
  'polishQuestions',
);

export const ItalianQuestion = mongoose.model<IQuestion>(
  'ItalianQuestion',
  QuestionSchema,
  'italianQuestions',
);

export const GermanQuestion = mongoose.model<IQuestion>(
  'GermanQuestion',
  QuestionSchema,
  'germanQuestions',
);

export const EnglishQuestion = mongoose.model<IQuestion>(
  'EnglishQuestion',
  QuestionSchema,
  'englishQuestions',
);
