import { Connection } from 'mongoose';
export declare const couponsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<unknown, {}, {}, {}>;
    inject: string[];
}[];
