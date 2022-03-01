"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const coupon_entity_1 = require("./entities/coupon.entity");
const coupons_json_1 = __importDefault(require("./coupons.json"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const paginate_1 = require("../common/pagination/paginate");
const mongoose_1 = require("mongoose");
const constants_1 = require("../common/constants");
const coupons = (0, class_transformer_1.plainToClass)(coupon_entity_1.Coupon, coupons_json_1.default);
const options = {
    keys: ['name'],
    threshold: 0.3,
};
const fuse = new fuse_js_1.default(coupons, options);
let CouponsService = class CouponsService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async create(createCouponDto) {
        const coupon = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createCouponDto), { created_at: new Date(), updated_at: new Date() });
        const newCoupon = new this.couponRepository(coupon);
        return await newCoupon.save();
    }
    async getCoupons({ search, limit, page }) {
        if (!page)
            page = 1;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const data = await this.couponRepository
            .find()
            .populate('image')
            .exec();
        const results = data.slice(startIndex, endIndex);
        const url = `/coupons?search=${search}&limit=${limit}`;
        return Object.assign({ data: results }, (0, paginate_1.paginate)(data.length, page, limit, results.length, url));
    }
    async getCoupon(id) {
        return await this.couponRepository.findOne({ id }).exec();
    }
    async update(id, updateCouponDto) {
        return await this.couponRepository.updateOne({ id }, Object.assign({}, updateCouponDto)).exec();
    }
    remove(id) {
        return this.couponRepository.deleteOne({ id }).exec();
    }
};
CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.COUPON_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CouponsService);
exports.CouponsService = CouponsService;
//# sourceMappingURL=coupons.service.js.map