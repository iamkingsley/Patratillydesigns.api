import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { addressesProviders } from './database/addresses.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
  ],
  controllers: [AddressesController],
  providers: [
    AddressesService,
    ...addressesProviders,
  ],
  exports: []
})
export class AddressesModule {}
