import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import Fuse from 'fuse.js';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { paginate } from 'src/common/pagination/paginate';
import { USER_MODEL } from 'src/common/constants';

const options = {
  keys: ['name', 'type.slug', 'categories.slug', 'status'],
  threshold: 0.3,
};
@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private userRepository: Model<User>) {}
  
  create(createUserDto: CreateUserDto) {
    const user = new this.userRepository(createUserDto)
    return user.save();
  }

  async getUsers({ text, limit, page }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: User[] = await this.userRepository.find().exec();
    if (text?.replace(/%/g, '')) {
      const fuse = new Fuse(data, options);
      data = fuse.search(text)?.map(({ item }) => item);
    }
    const results = data.slice(startIndex, endIndex);
    const url = `/users?limit=${limit}`;

    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }
  
  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ email }).exec(); 
  }

  async findOneByUuid(id: string) {
    return this.userRepository.findOne({ id }).exec(); 
  }

  findOne(id: string) {
    return this.userRepository
      .findById(new mongoose.Types.ObjectId(id))
      .populate('address').exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate(
      { id },
      {
        ...updateUserDto,
        updated_at: Date()
      }
    ).exec();
  }

  async remove(id: string): Promise<any> {
    return this.userRepository.deleteOne({ id }).exec();
  }
}
