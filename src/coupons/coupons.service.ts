import { v4 } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import couponsJson from './coupons.json';
import Fuse from 'fuse.js';
import { GetCouponsDto } from './dto/get-coupons.dto';
import { paginate } from 'src/common/pagination/paginate';
import { Model } from 'mongoose';
import { COUPON_MODEL } from 'src/common/constants';
const coupons = plainToClass(Coupon, couponsJson);
const options = {
  keys: ['name'],
  threshold: 0.3,
};
const fuse = new Fuse(coupons, options);
@Injectable()
export class CouponsService {
  constructor(@Inject(COUPON_MODEL) private couponRepository:Model<Coupon>
  ) {}
  // private coupons: Coupon[] = coupons;
  async create(createCouponDto: CreateCouponDto) {
    const coupon = {
      id: v4(),
      ...createCouponDto,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const newCoupon = new this.couponRepository(coupon)
    return await newCoupon.save();
  }

  async getCoupons({ search, limit, page }): Promise<any> {
    if (!page) page = 1;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const data = await this.couponRepository
      .find()
      .populate('image')
      .exec();
    // if (text?.replace(/%/g, '')) {
    //   data = fuse.search(text)?.map(({ item }) => item);
    // }

    const results = data.slice(startIndex, endIndex);
    const url = `/coupons?search=${search}&limit=${limit}`;
    return {
      data: results,
      ...paginate(data.length, page, limit, results.length, url),
    };
  }

  async getCoupon(id: string) {
    return await this.couponRepository.findOne({id}).exec();
  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<any> {
    return await this.couponRepository.updateOne({id}, {...updateCouponDto}).exec();
  }

  remove(id: string): Promise<any> {
    return this.couponRepository.deleteOne({id}).exec();
  }
}
