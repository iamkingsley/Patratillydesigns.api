import { v4 } from 'uuid';
import { SETTINGS_MODEL } from 'src/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
@Injectable()
export class SettingsService {

  constructor(@Inject(SETTINGS_MODEL) private settingsRepository: Model<Setting>) {}

  async create(createSettingDto: CreateSettingDto) {
    console.log("CreateSettingDto :", createSettingDto);
    const setting ={
      id: v4(),
      ...createSettingDto,
      created_at: new Date(),
      updated_at: new Date(),
    }
    return await new this.settingsRepository(setting).save();
  }

  async findAll() {
    const settings = await this.settingsRepository.find().exec();
    return settings[0]
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.settingsRepository.findOneAndUpdate(
      { id },
      {
        ...updateSettingDto,
        updated_at: Date(),
      }
    ).exec();
  }
}
