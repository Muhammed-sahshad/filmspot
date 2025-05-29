import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string
  name?: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
