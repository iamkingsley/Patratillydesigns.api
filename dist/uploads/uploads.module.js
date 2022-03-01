"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsModule = void 0;
const common_1 = require("@nestjs/common");
const uploads_service_1 = require("./uploads.service");
const uploads_controller_1 = require("./uploads.controller");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const attachment_provider_1 = require("./database/attachment.provider");
const database_module_1 = require("../database/database.module");
let UploadsModule = class UploadsModule {
};
UploadsModule = __decorate([
    (0, common_1.Module)({
        imports: [cloudinary_module_1.CloudinaryModule, database_module_1.DatabaseModule],
        controllers: [uploads_controller_1.UploadsController],
        providers: [
            uploads_service_1.UploadsService,
            ...attachment_provider_1.attachmentProviders,
        ],
    })
], UploadsModule);
exports.UploadsModule = UploadsModule;
//# sourceMappingURL=uploads.module.js.map