import { Address } from '../entities/address.entity';
declare const CreateAddressDto_base: import("@nestjs/common").Type<Pick<Address, "address" | "default" | "title" | "customer_id" | "type">>;
export declare class CreateAddressDto extends CreateAddressDto_base {
}
export {};
