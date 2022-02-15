import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ProfilesController, UsersController } from './users.controller';
import { usersProviders } from './database/users.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    ProfilesController
  ],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  exports: [UsersService]
})
export class UsersModule {}
