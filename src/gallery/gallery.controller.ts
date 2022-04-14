import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

    @Delete(':id')
    async deleteGallery(@Param('id') id: string) {
        return this._galleryService.remove(id);
    }

    @Put(':id')
    async updateGallery(@Param('id') id: string, @Body() updateGallery) {
        return this._galleryService.update(id, updateGallery);
    }

    @Get(':id')
    async getGalleryById(@Param('id') id: string) {
        return this._galleryService.getGalleryBySlug(id);
    }

}
