import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ensureExists } from 'src/common/ultils/ensure-exists';
import { IContent } from './interfaces/content.interface';
import { ContentsGateway } from './contents.gateway';

@Injectable()
export class ContentsService {
  constructor(
    @InjectModel(Content.name)
    private contentModel: Model<ContentDocument>,
    private readonly contentsGateway: ContentsGateway,
  ) {}

  async create(data: Partial<IContent>): Promise<IContent> {
    const created = new this.contentModel({
      ...data,
      blocks: data.blocks || [],
      status: data.status || 'draft',
    });
    return created.save();
  }

  async findAllPublish(): Promise<IContent[]> {
    return this.contentModel
      .find({ status: 'published' })
      .populate('createdBy')
      .populate('updatedBy')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findAll(): Promise<IContent[]> {
    return this.contentModel
      .find()
      .populate('createdBy')
      .populate('updatedBy')
      .exec();
  }

  async findOne(id: string): Promise<IContent> {
    const content = await this.contentModel
      .findById(id)
      .populate('createdBy')
      .populate('updatedBy')
      .exec();
    return ensureExists(content, `Content with Id ${id} not found`);
  }

  async findOnePublish(id: string): Promise<IContent> {
    const content = await this.contentModel
      .findOne({ _id: id, status: 'published' })
      .populate('createdBy')
      .populate('updatedBy')
      .exec();
    return ensureExists(content, `Content with Id ${id} not found`);
  }

  async update(id: string, dto: Partial<IContent>): Promise<Content> {
    const updatedContent = await this.contentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    const content = ensureExists(
      updatedContent,
      `Content with Id ${id} not found to update`,
    );

    if (dto.status === 'draft') {
      this.contentsGateway.broadcastHideContent(content.id.toString());
    }

    return content;
  }

  async delete(id: string): Promise<IContent> {
    const deletedContent = await this.contentModel.findByIdAndDelete(id).exec();
    const content = ensureExists(
      deletedContent,
      `Content with Id ${id} not found to deleted`,
    );
    if (content.id) {
      this.contentsGateway.broadcastHideContent(content.id.toString());
    }
    return content;
  }

  async updateStatus(
    id: string,
    status: 'draft' | 'published',
    updatedBy: string,
  ): Promise<IContent> {
    const content = await this.contentModel
      .findByIdAndUpdate(id, { status, updatedBy }, { new: true })
      .exec();
    if (!content) {
      throw new NotFoundException(`Content with id ${id} not found`);
    }
    if (content.status === 'published') {
      try {
        this.contentsGateway.broadcastNewContent(content);
      } catch (e) {
        console.warn('Socket not initialized — skip.');
      }
    }
    return content;
  }
}
