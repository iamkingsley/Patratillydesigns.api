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
exports.UploadsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const uploads_service_1 = require("./uploads.service");
let UploadsController = class UploadsController {
    constructor(uploadsService, cloudinaryService) {
        this.uploadsService = uploadsService;
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImageToCloudinary(attachment) {
        console.log("file :", attachment);
        return await this.cloudinaryService.uploadImage(attachment).then(async (response) => {
            const { asset_id, url, } = response;
            const att = await this.uploadsService.create({
                asset_id,
                original: url,
                thumbnail: url
            });
            return [
                {
                    _id: att._id,
                    id: response.asset_id,
                    original: response.url,
                    thumbnail: response.url,
                }
            ];
        }).catch(() => {
            throw new common_1.BadRequestException('Invalid file type.');
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('attachment[]')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadImageToCloudinary", null);
UploadsController = __decorate([
    (0, common_1.Controller)('attachments'),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService,
        cloudinary_service_1.CloudinaryService])
], UploadsController);
exports.UploadsController = UploadsController;
//# sourceMappingURL=uploads.controller.js.map