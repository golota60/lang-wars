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
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
