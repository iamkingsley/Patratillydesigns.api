import { v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/common/constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'witchcraft',
      api_key: '536134274247873',
      api_secret: 'APOnVgPl5GbgCzhq01_e1VCF6u8',
    });
  },
};