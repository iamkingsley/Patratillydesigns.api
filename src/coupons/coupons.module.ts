import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { couponsProviders } from './database/coupons.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [CouponsController],
  providers: [CouponsService,
  ...couponsProviders],
})
export class CouponsModule {}
