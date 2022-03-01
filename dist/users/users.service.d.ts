import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto, UserPaginator } from './dto/get-users.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Model<User>);
    create(createUserDto: CreateUserDto): Promise<mongoose.Document<unknown, any, User> & User & {
        _id: string;
    }>;
    getUsers({ text, limit, page }: GetUsersDto): Promise<UserPaginator>;
    findOneByEmail(email: string): Promise<mongoose.Document<unknown, any, User> & User & {
        _id: string;
    }>;
    findOneByUuid(id: string): Promise<mongoose.Document<unknown, any, User> & User & {
        _id: string;
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, any, User> & User & {
        _id: string;
    }>;
    update(id: string, updateUserDto: any): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<any>;
}
