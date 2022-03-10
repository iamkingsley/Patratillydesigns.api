import { Coupon } from '../entities/coupon.entity';
declare const CreateCouponDto_base: import("@nestjs/common").Type<Pick<Coupon, "code" | "description" | "type" | "image" | "amount" | "active_from" | "expire_at">>;
export declare class CreateCouponDto extends CreateCouponDto_base {
}
export {};
