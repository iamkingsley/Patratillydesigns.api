import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { tagsProviders } from './database/tags.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TagsController],
  providers: [
    TagsService,
  ...tagsProviders],
})
export class TagsModule {}
