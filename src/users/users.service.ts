import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(username: string, password: string, role: string): Promise<UserDocument> {
    const existing = await this.userModel.findOne({ username });
    if (existing) throw new ConflictException('Username already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashed, role });
    return user.save();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username });
  }
}
