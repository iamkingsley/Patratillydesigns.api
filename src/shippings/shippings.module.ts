import { Module } from '@nestjs/common';
import { ShippingsService } from './shippings.service';
import { ShippingsController } from './shippings.controller';
import { shippingsProviders } from './database/shippings.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ShippingsController],
  providers: [
    ShippingsService,
  ...shippingsProviders
],
})
export class ShippingsModule {}
