import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/user';
import { User, UserDocument } from './schemas/user.schema';
import { ensureExists } from 'src/common/ultils/ensure-exists';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<IUser>): Promise<IUser> {
    const existing = await this.userModel.findOne({
      email: data.email,
    });
    if (existing) {
      throw new BadRequestException(`Email "${data.email}" already exists`);
    }
    const hash = await bcrypt.hash(data.password, 10);
    const createdUser = new this.userModel({ ...data, password: hash });
    return createdUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<IUser> {
    const user = await this.userModel.findById(id).exec();
    return ensureExists(user, `User with Id ${id} not found`);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateDto: Partial<IUser>): Promise<User> {
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

  async delete(id: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    return ensureExists(deletedUser, `User with ID ${id} not found to delete`);
  }
}
