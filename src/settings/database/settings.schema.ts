import mongoose from 'mongoose';
import { ATTACHMENT } from 'src/common/constants';

export const SettingsSchema = new mongoose.Schema({
  id: String,
  created_at: Date,
  updated_at: Date,
  options: new mongoose.Schema({
      siteTitle: String,
      siteSubtitle: String,
      currency: String,
      minimumOrderAmount: Number,
      walletToCurrencyRatio: Number,
      signupPoints: Number,
      deliveryTime: [],
      logo: {
        type: mongoose.Types.ObjectId,
        ref: ATTACHMENT,
        required: false
      },
      taxClass: String,
      shippingClass: String,
      seo: new mongoose.Schema({
        metaTitle: {
            type: String, 
            required: false,
        },
        metaDescription: {
            type: String, 
            required: false,
        },
        ogTitle: {
            type: String, 
            required: false,
        },
        ogDescription: {
            type: String, 
            required: false,
        },
        ogImage:  {
            type: mongoose.Types.ObjectId,
            ref: ATTACHMENT,
            required: false
        },
        twitterHandle: {
            type: String, 
            required: false,
        },
        twitterCardType: {
            type: String, 
            required: false,
        },
        metaTags: {
            type: String, 
            required: false,
        },
        canonicalUrl: {
            type: String, 
            required: false,
        },
      }),
      google: new mongoose.Schema({ 
        isEnable: Boolean,
        tagManagerId: String,
      }),
      facebook: new mongoose.Schema({
        isEnable: Boolean,
        appId: String,
        pageId: String,
      }),
      contactDetails: Object,
      aboutUs: String,
  })
})
