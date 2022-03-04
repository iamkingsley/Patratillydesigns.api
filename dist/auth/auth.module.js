"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const jwt_strategy_1 = require("./jwt.strategy");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const local_strategy_1 = require("./local.strategy");
const users_module_1 = require("./../users/users.module");
const auth_providers_1 = require("./database/auth.providers");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const database_module_1 = require("../database/database.module");
const mail_module_1 = require("../mail/mail.module");
const mail_service_1 = require("../mail/mail.service");
const config_1 = require("@nestjs/config");
const sms_module_1 = require("../sms/sms.module");
const sms_service_1 = require("../sms/sms.service");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            users_module_1.UsersModule,
            mail_module_1.MailModule,
            config_1.ConfigService,
            sms_module_1.SmsModule,
            sms_service_1.SmsService,
            config_1.ConfigModule.forRoot(),
            passport_1.PassportModule.register({
                imports: [passport_1.AuthModuleOptions],
                session: true,
            }),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: constants_1.jwtConstants.expiresIn },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            ...auth_providers_1.authProviders,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            mail_service_1.MailService,
            sms_service_1.SmsService
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map