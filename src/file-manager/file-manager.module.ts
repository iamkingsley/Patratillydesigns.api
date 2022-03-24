import { Module } from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manager.controller';
import { fileManagerProviders } from './database/file-manager.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [DatabaseModule, CloudinaryModule],
  controllers: [FileManagerController],
  providers: [
    FileManagerService,
  ...fileManagerProviders]
})
export class FileManagerModule {}
