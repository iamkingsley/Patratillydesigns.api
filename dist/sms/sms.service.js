"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const twilio_1 = __importDefault(require("twilio"));
const TWILIO_ACCOUNT_SID = "AC41e1a65eb52f0406ed506faa9ee59bc0";
const TWILIO_AUTH_TOKEN = "1d59283763e34372f43c60931cb56e5b";
const client = (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
let SmsService = class SmsService {
    async sendSMS(phone_number, otp) {
        await client.messages.create({
            body: `Please use this otp code ${otp} to verify`,
            from: "+19034517308",
            to: phone_number,
        });
    }
};
SmsService = __decorate([
    (0, common_1.Injectable)()
], SmsService);
exports.SmsService = SmsService;
//# sourceMappingURL=sms.service.js.map