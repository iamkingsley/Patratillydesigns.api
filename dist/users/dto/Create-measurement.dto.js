"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMeasurementDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateMeasurementDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { bustName: { required: true, type: () => String }, waistName: { required: true, type: () => String }, hipName: { required: true, type: () => String }, shoulderWaistName: { required: true, type: () => String }, shoulderNippleName: { required: true, type: () => String }, shoulderUnderBustName: { required: true, type: () => String }, blouseLengthName: { required: true, type: () => String }, fullLengthName: { required: true, type: () => String }, dressLegthName: { required: true, type: () => String }, slitLengthName: { required: true, type: () => String }, acrossBackName: { required: true, type: () => String }, acrossChestName: { required: true, type: () => String }, aroundArmName: { required: true, type: () => String }, sleeveLengthName: { required: true, type: () => String }, shirtLenghtName: { required: true, type: () => String } };
    }
}
exports.CreateMeasurementDto = CreateMeasurementDto;
//# sourceMappingURL=Create-measurement.dto.js.map