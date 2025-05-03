import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BlockSchema } from './block.schema';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [BlockSchema], default: [] })
  blocks: Array<{
    type: 'text' | 'image' | 'video';
    headings?: string[];
    paragraphs?: string[];
    url?: string;
  }>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: ['draft', 'published'],
    default: 'draft',
  })
  status: 'draft' | 'published';
}
export const ContentSchema = SchemaFactory.createForClass(Content);
