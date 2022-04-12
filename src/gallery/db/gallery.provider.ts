import { GALLERY_MODEL, GALLERY, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { GallerySchema } from './gallery.schema';

export const galleryProviders = [
    {
        provide: GALLERY_MODEL,
        useFactory: (connection: Connection) => connection.model(GALLERY, GallerySchema),
        inject: [DATABASE_CONNECTION],
    },
];