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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressesService = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("../common/constants");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const users_service_1 = require("../users/users.service");
let AddressesService = class AddressesService {
    constructor(addressRepository, userService) {
        this.addressRepository = addressRepository;
        this.userService = userService;
    }
    async create(createAddressDto) {
        const _address = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createAddressDto), { created_at: Date(), updated_at: Date() });
        const address = new this.addressRepository(_address);
        address.save();
        const customer = await this.userService.findOneByUuid(createAddressDto.customer_id);
        customer.address.push(address);
        customer.save();
        return address;
    }
    async update(id, updateAddressDto) {
        return this.addressRepository.updateOne({ id }, Object.assign(Object.assign({}, updateAddressDto), { updated_at: Date() })).exec();
    }
    async remove(id) {
        const address = await this.addressRepository.findOne({ id }).exec();
        const customer = await this.userService.findOneByUuid(address.customer_id);
        customer.address.map((add, i) => {
            if (add.id === id) {
                customer.address.splice(i);
            }
        });
        customer.save();
        return address.delete();
    }
};
AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ADDRES_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        users_service_1.UsersService])
], AddressesService);
exports.AddressesService = AddressesService;
//# sourceMappingURL=addresses.service.js.map