import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { attachmentProviders } from './database/attachment.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [CloudinaryModule, DatabaseModule],
  controllers: [UploadsController],
  providers: [
    UploadsService,
    ...attachmentProviders,
  ],
})
export class UploadsModule {}
