import { COUPON } from '../../common/constants';
import { COUPON_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { CouponSchema } from './coupons.schema';

export const couponsProviders = [
  {
    provide: COUPON_MODEL,
    useFactory: (connection: Connection) => connection.model(COUPON, CouponSchema),
    inject: [DATABASE_CONNECTION],
  },
];