import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { User } from '../entities/user.entity';
import { CreateMeasurementDto } from './Create-measurement.dto';
import { CreateProfileDto } from './create-profile.dto';
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<User, "name" | "email" | "password" | "is_active" | "permissions">>;
export declare class CreateUserDto extends CreateUserDto_base {
    address?: CreateAddressDto[];
    profile?: CreateProfileDto;
    measurement?: CreateMeasurementDto;
}
export {};
