import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { fileManagerProviders } from './database/file-manager.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { attachmentProviders } from 'src/uploads/database/attachment.provider';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [FileManagerController],
  providers: [
    FileManagerService,
    ...attachmentProviders]
})
export class FileManagerModule {}
