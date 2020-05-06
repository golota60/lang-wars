import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  friends: {
    type: Array,
    required: true,
  },
  receivedInvitations: {
    type: Array,
    required: true,
  },
  sentInvitations: {
    type: Array,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  losses: {
    type: Number,
    required: true,
  },
  draws: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
