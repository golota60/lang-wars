import mongoose from 'mongoose';
import IUser from './IUser';

export default interface IMatch extends mongoose.Document {
  enemy: IUser;
  language: string;
  outcome: string;
}
