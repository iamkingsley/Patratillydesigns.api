"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_address_dto_1 = require("../../addresses/dto/create-address.dto");
const user_entity_1 = require("../entities/user.entity");
class CreateUserDto extends (0, swagger_1.PickType)(user_entity_1.User, [
    'name',
    'email',
    'password',
    'is_active',
    'permissions',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return { address: { required: false, type: () => [require("../../addresses/dto/create-address.dto").CreateAddressDto] }, profile: { required: false, type: () => require("./create-profile.dto").CreateProfileDto }, measurement: { required: false, type: () => require("./Create-measurement.dto").CreateMeasurementDto } };
    }
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map