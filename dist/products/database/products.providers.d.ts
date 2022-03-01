import { Connection } from 'mongoose';
export declare const productsProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<unknown, {}, {}, {}>;
    inject: string[];
}[];
