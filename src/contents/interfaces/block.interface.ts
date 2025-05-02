import { Types } from 'mongoose';

export interface IBlock {
  _id?: any;
  type: 'text' | 'image' | 'video';
  headings?: string[];
  paragraphs?: string[];
  url?: string;
}
