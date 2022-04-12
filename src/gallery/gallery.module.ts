import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { galleryProviders } from './db/gallery.provider';
import { GalleryController } from './gallery.controller';
import { GalleryService } from './gallery.service';

@Module({
    imports: [DatabaseModule],
    controllers: [GalleryController],
    providers: [
        GalleryService,
        ...galleryProviders
    ]
})
export class GalleryModule { }
