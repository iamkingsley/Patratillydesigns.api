import { PickType } from '@nestjs/swagger';
import { CreateAddressDto } from 'src/addresses/dto/create-address.dto';
import { User } from '../entities/user.entity';
import { CreateMeasurementDto } from './Create-measurement.dto';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto extends PickType(User, [
  'name',
  'email',
  'password',
  'is_active',
  'permissions',
]) {
  address?: CreateAddressDto[];
  profile?: CreateProfileDto;
  measurement?: CreateMeasurementDto;
}
