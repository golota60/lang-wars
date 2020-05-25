import mongoose from 'mongoose';

export default interface IQuestion extends mongoose.Document {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  correctAnswer: string;
}
