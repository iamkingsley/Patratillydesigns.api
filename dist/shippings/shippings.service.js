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
exports.ShippingsService = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("mongoose");
const constants_1 = require("../common/constants");
const shipping_entity_1 = require("./entities/shipping.entity");
const shippings_json_1 = __importDefault(require("./shippings.json"));
const shippings = (0, class_transformer_1.plainToClass)(shipping_entity_1.Shipping, shippings_json_1.default);
let ShippingsService = class ShippingsService {
    constructor(shippingRepository) {
        this.shippingRepository = shippingRepository;
        this.shippings = shippings;
    }
    create(createShippingDto) {
        const shipping = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createShippingDto), { created_at: new Date(), updated_at: new Date() });
        return new this.shippingRepository(shipping).save();
    }
    async getShippings({}) {
        return await this.shippingRepository.find().exec();
    }
    async findOne(id) {
        return await this.shippingRepository.findOne({ id }).exec();
    }
    async update(id, updateShippingDto) {
        return await this.shippingRepository.findOneAndUpdate({ id }, Object.assign(Object.assign({}, updateShippingDto), { updated_at: new Date() })).exec();
    }
    remove(id) {
        return this.shippingRepository.deleteOne({ id }).exec();
    }
};
ShippingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.SHIPPING_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ShippingsService);
exports.ShippingsService = ShippingsService;
//# sourceMappingURL=shippings.service.js.map