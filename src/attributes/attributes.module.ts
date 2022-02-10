import { Module } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AttributesController } from './attributes.controller';
import { attributesProviders } from './database/attributes.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [AttributesController],
  providers: [
    AttributesService,
  ...attributesProviders],
})
export class AttributesModule {}
