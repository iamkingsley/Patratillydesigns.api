import { ATTACHMENT } from './../../common/constants';
import mongoose from 'mongoose';

export const GallerySchema = new mongoose.Schema({
    id: String,
    slug: String,
    image: {
        type: mongoose.Types.ObjectId,
        ref: ATTACHMENT,
        required: false
    },
    description: { type: String, required: false },
    created_at: Date,
    updated_at: Date,
});
