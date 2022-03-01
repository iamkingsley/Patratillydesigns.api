import { CoreEntity } from 'src/common/entities/core.entity';
import { AddressType } from 'src/common/enums';
import { User } from 'src/users/entities/user.entity';
export declare class Address extends CoreEntity {
    title: string;
    default: boolean;
    address: UserAddress;
    type: AddressType;
    customer: User;
    customer_id: string;
}
export declare class UserAddress {
    street_address: string;
    country: string;
    city: string;
    state: string;
    zip: string;
}
