import { Connection } from 'mongoose';
export declare const settingsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<unknown, {}, {}, {}>;
    inject: string[];
}[];
