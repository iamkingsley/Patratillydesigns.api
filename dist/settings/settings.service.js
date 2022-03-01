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
exports.SettingsService = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("../common/constants");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let SettingsService = class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async create(createSettingDto) {
        console.log("CreateSettingDto :", createSettingDto);
        const setting = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createSettingDto), { created_at: new Date(), updated_at: new Date() });
        return await new this.settingsRepository(setting).save();
    }
    async findAll() {
        const settings = await this.settingsRepository.find().exec();
        return settings[0];
    }
    update(id, updateSettingDto) {
        return this.settingsRepository.findOneAndUpdate({ id }, Object.assign(Object.assign({}, updateSettingDto), { updated_at: Date() })).exec();
    }
};
SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.SETTINGS_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SettingsService);
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map