import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import Fuse from 'fuse.js';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { paginate } from 'src/common/pagination/paginate';
import { USER_MODEL } from 'src/common/constants';
import { slugOptions } from 'src/common/utils/slug-options';
import slugify from 'slugify';

const options = {
  keys: ['name', 'email', 'is_active'],
  threshold: 0.3,
};
@Injectable()
export class UsersService {
  constructor(@Inject(USER_MODEL) private userRepository: Model<User>) {}
  
  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      slug: slugify(createUserDto.name, slugOptions),
      created_at: Date(),
      updated_at: Date()
    }
    const userDoc = new this.userRepository(user);
    return userDoc.save();
  }

  async getUsers({ search, limit, page, orderBy, sortedBy }: GetUsersDto): Promise<UserPaginator> {
    if (!page) page = 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data: User[] = await this.userRepository
      .find()
      .sort({ [orderBy]: sortedBy })
      .limit(limit)
      .exec();

    if (search) {
      const fuse = new Fuse(data, options);
      data = fuse.search(search)?.map(({ item }) => item);
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

  async findOneByPhone(phone: string) {
    return this.userRepository.findOne({ phone }).exec(); 
  }

  async findOneByUuid(id: string) {
    return this.userRepository.findOne({ id }).exec(); 
  }

  findOne(id: string) {
    return this.userRepository
      .findById(new mongoose.Types.ObjectId(id))
      .populate('address')
      .populate('profile.avatar')
      .exec();
  }

  async findByPhoneOrEmail(input) {
    return this.userRepository
      .findOne({ $or: [
        { phone: input.phone },
        { email: input.email }
      ]})
      .populate('address')
      .populate('profile.avatar')
      .exec();
  }

  async loginWithEmailOrPhone(username) {
    return this.userRepository
      .findOne({ $or: [
        { phone: username },
        { email: username }
      ]})
      .populate('address')
      .populate('profile.avatar')
      .exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.findOneAndUpdate(
      { id },
      {
        ...updateUserDto,
        slug: slugify(updateUserDto.name, slugOptions),
        updated_at: Date()
      }
    ).exec();
    return {
      success: true,
      message: 'Updated successfully!'
    }
  }

  async remove(id: string): Promise<any> {
    return this.userRepository.deleteOne({ id }).exec();
  }
}
