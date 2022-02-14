import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { addressesProviders } from './database/addresses.provider';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [AddressesController],
  providers: [
    AddressesService,
    ...addressesProviders,
  ],
  exports: []
})
export class AddressesModule {}
