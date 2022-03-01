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
exports.AttributesService = void 0;
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const constants_1 = require("../common/constants");
let AttributesService = class AttributesService {
    constructor(attributeRepository) {
        this.attributeRepository = attributeRepository;
    }
    async create(createAttributeDto) {
        const { values } = createAttributeDto;
        const attr = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createAttributeDto), { created_at: new Date(), updated_at: new Date() });
        const attribute = new this.attributeRepository(attr);
        return await attribute.save();
    }
    findAll() {
        return this.attributeRepository.find().exec();
    }
    async findOne(id) {
        const attr = await this.attributeRepository.findOne({ id }).exec();
        console.log("attr: ", attr);
        return attr;
    }
    async update(id, updateAttributeDto) {
        return this.attributeRepository.updateOne({ id }, Object.assign({}, updateAttributeDto)).exec();
    }
    remove(id) {
        return this.attributeRepository.remove({ id }).exec();
    }
};
AttributesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.ATTRIBUTE_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AttributesService);
exports.AttributesService = AttributesService;
//# sourceMappingURL=attributes.service.js.map