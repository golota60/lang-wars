import mongoose from 'mongoose';

export default interface IUser extends mongoose.Document {
  name: string;
  password: string;
  email: string;
  friends: Array<IUser>;
  receivedInvitations: Array<IUser>;
  sentInvitations: Array<IUser>;
}
