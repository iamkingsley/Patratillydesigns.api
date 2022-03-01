import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { Model } from 'mongoose';
export declare class CouponsService {
    private couponRepository;
    constructor(couponRepository: Model<Coupon>);
    create(createCouponDto: CreateCouponDto): Promise<import("mongoose").Document<unknown, any, Coupon> & Coupon & {
        _id: string;
    }>;
    getCoupons({ search, limit, page }: {
        search: any;
        limit: any;
        page: any;
    }): Promise<any>;
    getCoupon(id: string): Promise<import("mongoose").Document<unknown, any, Coupon> & Coupon & {
        _id: string;
    }>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<any>;
    remove(id: string): Promise<any>;
}
