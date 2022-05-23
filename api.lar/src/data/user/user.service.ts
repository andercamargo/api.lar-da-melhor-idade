import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}
  async create(doc: User) {
    const result = await new this.userModel(doc).save();
    return result.id;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await this.userModel.findById(id.toString()).exec();
      if (result != null) {
        var user = new User();
        user.id = result.id;
        user.name = result.name;
        user.active = result.active;
        user.age = result.age;

        return user;
      }
    }
    return null;
  }

  async update(user: User) {
    const result = await this.userModel.findByIdAndUpdate(user.id, user);
    return result;
  }

  async remove(id: string) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const result = await this.userModel.findByIdAndDelete(id);
      return result;
    }
    return null;
  }
}
