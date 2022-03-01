/// <reference types="mongoose" />
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(createSettingDto: CreateSettingDto): Promise<import("mongoose").Document<unknown, any, import("./entities/setting.entity").Setting> & import("./entities/setting.entity").Setting & {
        _id: string;
    }>;
    findAll(): Promise<import("mongoose").Document<unknown, any, import("./entities/setting.entity").Setting> & import("./entities/setting.entity").Setting & {
        _id: string;
    }>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<import("mongoose").Document<unknown, any, import("./entities/setting.entity").Setting> & import("./entities/setting.entity").Setting & {
        _id: string;
    }>;
}
