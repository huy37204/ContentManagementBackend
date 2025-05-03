import { Types } from 'mongoose';
import { IBlock } from './block.interface';

export interface IContent {
  _id?: any;
  title: string;
  blocks: IBlock[];
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  status: 'draft' | 'published';
  createdAt?: Date;
  updatedAt?: Date;
}
