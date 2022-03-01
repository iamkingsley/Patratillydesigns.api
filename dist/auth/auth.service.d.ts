import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, ChangePasswordDto, ForgetPasswordDto, LoginDto, CoreResponse, RegisterDto, ResetPasswordDto, VerifyForgetPasswordDto, SocialLoginDto, OtpLoginDto, OtpResponse, VerifyOtpDto, OtpDto } from './dto/create-auth.dto';
import { Model } from 'mongoose';
import { Contact } from './entities/contact.entity';
export declare class AuthService {
    private contactsRepository;
    private usersService;
    private jwtService;
    constructor(contactsRepository: Model<Contact>, usersService: UsersService, jwtService: JwtService);
    register(createUserInput: RegisterDto): Promise<AuthResponse>;
    login(loginInput: LoginDto): Promise<AuthResponse>;
    changePassword(changePasswordInput: ChangePasswordDto): Promise<CoreResponse>;
    forgetPassword(forgetPasswordInput: ForgetPasswordDto): Promise<CoreResponse>;
    verifyForgetPasswordToken(verifyForgetPasswordTokenInput: VerifyForgetPasswordDto): Promise<CoreResponse>;
    resetPassword(resetPasswordInput: ResetPasswordDto): Promise<CoreResponse>;
    socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse>;
    otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse>;
    verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse>;
    sendOtpCode(otpInput: OtpDto): Promise<OtpResponse>;
    contactUs(input: Contact): Promise<Contact>;
    me(req: any): Promise<import("mongoose").Document<unknown, any, import("../users/entities/user.entity").User> & import("../users/entities/user.entity").User & {
        _id: string;
    }>;
}
