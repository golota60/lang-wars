import mongoose from 'mongoose';
import IMatch from './IMatch';

export default interface IUser extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  friends: Array<IUser>;
  receivedInvitations: Array<IUser>;
  sentInvitations: Array<IUser>;
  wins: number;
  losses: number;
  draws: number;
  matchHistory: Array<IMatch>;
  awaitingDuels: Array<IMatch>;
  sentDuels: Array<IMatch>;
}
