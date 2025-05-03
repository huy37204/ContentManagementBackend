import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ensureExists } from 'src/common/ultils/ensure-exists';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({
      email: dto.email,
    });
    if (existing) {
      throw new BadRequestException(`Email "${dto.email}" already exists`);
    }
    const hash = await bcrypt.hash(dto.password, 10);
    const createdUser = new this.userModel({ ...dto, password: hash });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return ensureExists(user, `User with Id ${id} not found`);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateDto: Partial<CreateUserDto>): Promise<User> {
    if (updateDto.email) {
      const existing = await this.userModel.findOne({
        email: updateDto.email,
        _id: { $ne: new Types.ObjectId(id) },
      });
      if (existing) {
        throw new BadRequestException(
          `Email "${updateDto.email}" already exists`,
        );
      }
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateDto, { new: true, timestamps: true })
      .exec();
    return ensureExists(updatedUser, `User with ID ${id} not found to update`);
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return ensureExists(deletedUser, `User with ID ${id} not found to delete`);
  }
}
