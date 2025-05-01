import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ensureExists } from 'src/common/ultils/ensure-exists';
import { IContent } from './interfaces/content.interface';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<ContentDocument>,
  ) {}

  async create(data: Partial<IContent>): Promise<IContent> {
    const created = new this.contentModel(data);
    return created.save();
  }

  async findAll(): Promise<IContent[]> {
    return this.contentModel.find().populate('createdBy').exec();
  }

  async findOne(id: string): Promise<IContent> {
    const content = await this.contentModel.findById(id).exec();
    return ensureExists(content, `Content with Id ${id} not found`);
  }

  async update(id: string, dto: Partial<IContent>): Promise<Content> {
    const updatedContent = await this.contentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return ensureExists(
      updatedContent,
      `Content with Id ${id} not found to updated`,
    );
  }

  async delete(id: string): Promise<IContent> {
    const deletedContent = await this.contentModel.findByIdAndDelete(id).exec();
    return ensureExists(
      deletedContent,
      `Content with Id ${id} not found to deleted`,
    );
  }
}
