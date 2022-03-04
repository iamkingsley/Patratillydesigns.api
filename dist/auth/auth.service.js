"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const enums_1 = require("./../common/enums");
const users_service_1 = require("./../users/users.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const constants_1 = require("../common/constants");
const mongoose_1 = require("mongoose");
const sms_service_1 = require("../sms/sms.service");
const otp_generator_1 = __importDefault(require("otp-generator"));
let AuthService = class AuthService {
    constructor(contactsRepository, usersService, jwtService, sms) {
        this.contactsRepository = contactsRepository;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.sms = sms;
    }
    async register(createUserInput) {
        const hashedPassword = await bcrypt_1.default.hash(createUserInput.password, 10);
        const newUser = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, createUserInput), { password: hashedPassword, permissions: [enums_1.PERMISSIONS.CUSTOMER], created_at: new Date(), updated_at: new Date() });
        const user = await this.usersService.create(newUser);
        const { password } = user, result = __rest(user, ["password"]);
        const payload = Object.assign(Object.assign({}, result), { sub: user._id });
        return {
            token: this.jwtService.sign(payload),
            permissions: user.permissions,
        };
    }
    async login(loginInput) {
        const { email, password: plaintextPassword } = loginInput;
        const user = await this.usersService.findOneByEmail(email);
        const isPasswordMatching = await bcrypt_1.default.compare(plaintextPassword, user.password);
        if (user && isPasswordMatching) {
            const { password } = user, result = __rest(user, ["password"]);
            const payload = Object.assign(Object.assign({}, result), { sub: user._id });
            return {
                token: this.jwtService.sign(payload),
                permissions: user.permissions,
            };
        }
        return null;
    }
    async changePassword(changePasswordInput) {
        console.log(changePasswordInput);
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async forgetPassword(forgetPasswordInput) {
        console.log(forgetPasswordInput);
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async verifyForgetPasswordToken(verifyForgetPasswordTokenInput) {
        console.log(verifyForgetPasswordTokenInput);
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async resetPassword(resetPasswordInput) {
        console.log(resetPasswordInput);
        return {
            success: true,
            message: 'Password change successful',
        };
    }
    async socialLogin(socialLoginDto) {
        console.log(socialLoginDto);
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
        };
    }
    async otpLogin(otpLoginDto) {
        console.log(otpLoginDto);
        return {
            token: 'jwt token',
            permissions: ['super_admin', 'customer'],
        };
    }
    async verifyOtpCode(verifyOtpInput) {
        const { code } = verifyOtpInput;
        if (code === this.otpData) {
            return {
                message: 'success',
                success: true,
            };
        }
        else {
            return {
                message: 'Wrong token number',
                success: false
            };
        }
    }
    async sendOtpCode(otpInput) {
        const otp = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false });
        this.otpData = otp;
        await this.sms.sendSMS(otpInput.phone_number, otp);
        return {
            message: 'success',
            success: true,
            id: '1',
            provider: 'google',
            phone_number: otpInput.phone_number,
            is_contact_exist: true,
        };
    }
    async contactUs(input) {
        const createdContact = new this.contactsRepository(input);
        return createdContact.save();
    }
    me(req) {
        return this.usersService.findOne(req.user.userId);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CONTACT_MODEL)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        users_service_1.UsersService,
        jwt_1.JwtService,
        sms_service_1.SmsService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map