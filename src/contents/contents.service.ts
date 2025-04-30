import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContentDto } from './dto/create-content.dto';
import { ensureExists } from 'src/common/ultils/ensure-exists';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<ContentDocument>,
  ) {}

  async create(dto: CreateContentDto): Promise<Content> {
    const created = new this.contentModel(dto);
    return created.save();
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().populate('createdBy').exec();
  }

  async findOne(id: string): Promise<Content> {
    const content = await this.contentModel.findById(id).exec();
    return ensureExists(content, `Content with Id ${id} not found`);
  }

  async update(id: string, dto: Partial<CreateContentDto>): Promise<Content> {
    const updatedContent = await this.contentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    return ensureExists(
      updatedContent,
      `Content with Id ${id} not found to updated`,
    );
  }

  async delete(id: string): Promise<Content> {
    const deletedContent = await this.contentModel.findByIdAndDelete(id).exec();
    return ensureExists(
      deletedContent,
      `Content with Id ${id} not found to deleted`,
    );
  }
}
