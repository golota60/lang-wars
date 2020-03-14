import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  password: string;
  email: string;
}

export default IUser;
