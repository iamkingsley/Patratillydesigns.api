import { Model } from 'mongoose';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Model<Setting>);
    create(createSettingDto: CreateSettingDto): Promise<import("mongoose").Document<unknown, any, Setting> & Setting & {
        _id: string;
    }>;
    findAll(): Promise<import("mongoose").Document<unknown, any, Setting> & Setting & {
        _id: string;
    }>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<import("mongoose").Document<unknown, any, Setting> & Setting & {
        _id: string;
    }>;
}
