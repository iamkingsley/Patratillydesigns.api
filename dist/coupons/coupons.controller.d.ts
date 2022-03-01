/// <reference types="mongoose" />
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    createCoupon(createCouponDto: CreateCouponDto): Promise<import("mongoose").Document<unknown, any, import("./entities/coupon.entity").Coupon> & import("./entities/coupon.entity").Coupon & {
        _id: string;
    }>;
    getCoupons(query: any): Promise<any>;
    getCoupon(id: string): Promise<import("mongoose").Document<unknown, any, import("./entities/coupon.entity").Coupon> & import("./entities/coupon.entity").Coupon & {
        _id: string;
    }>;
    updateCoupon(id: string, updateCouponDto: UpdateCouponDto): Promise<any>;
    deleteCoupon(id: string): Promise<any>;
}
