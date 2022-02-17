import { SETTINGS, SETTINGS_MODEL, DATABASE_CONNECTION } from 'src/common/constants';
import { Connection } from 'mongoose';
import { SettingsSchema } from './settings.schema';

export const settingsProviders = [
  {
    provide: SETTINGS_MODEL,
    useFactory: (connection: Connection) => connection.model(SETTINGS, SettingsSchema),
    inject: [DATABASE_CONNECTION],
  },
];