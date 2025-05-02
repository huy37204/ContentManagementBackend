import mongoose, { Schema as MongooseSchema, Types } from 'mongoose';
import { IBlock } from '../interfaces/block.interface';

export const BlockSchema = new mongoose.Schema<IBlock>({
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  headings: [String],
  paragraphs: [String],
  url: String,
});
