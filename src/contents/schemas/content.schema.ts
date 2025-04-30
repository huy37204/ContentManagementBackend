import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
export class Content {
  @Prop({ required: true })
  title: string;

  @Prop({
    type: [
      {
        type: {
          type: String,
          enum: ['text', 'image', 'video'],
          required: true,
        },
        data: { type: String },
        url: { type: String },
      },
    ],
  })
  blocks: Array<{
    type: 'text' | 'image' | 'video';
    data?: string;
    url?: string;
  }>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updatedBy: Types.ObjectId;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
