import { Body, Controller, Get, Post } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
    constructor(private _galleryService: GalleryService) { }

    @Post()
    createGallery(@Body() createGallery) {
        return this._galleryService.create(createGallery);
    }

    @Get()
    getGallery() {
        return this._galleryService.findAll();
    }
}
