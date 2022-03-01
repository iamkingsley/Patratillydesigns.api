/// <reference types="mongoose" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { GetUsersDto } from './dto/get-users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, any, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: string;
    }>;
    getAllUsers(query: GetUsersDto): Promise<import("./dto/get-users.dto").UserPaginator>;
    getUser(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/user.entity").User> & import("./entities/user.entity").User & {
        _id: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    removeUser(id: string): Promise<any>;
    activeUser(id: number): void;
    banUser(id: number): void;
}
export declare class ProfilesController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createProfile(createProfileDto: CreateProfileDto): void;
    updateProfile(updateProfileDto: UpdateProfileDto): void;
    deleteProfile(id: string): Promise<any>;
}
