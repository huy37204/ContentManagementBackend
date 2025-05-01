import { Types } from 'mongoose';

export interface IBlock {
  _id?: any;
  type: 'text' | 'image' | 'video';
  heading?: string;
  paragraph?: string;
  url?: string;
}
