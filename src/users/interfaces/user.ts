import { Types } from 'mongoose';

export interface IUser {
  _id?: any;
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'editor' | 'client';
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
