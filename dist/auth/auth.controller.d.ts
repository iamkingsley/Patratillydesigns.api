/// <reference types="mongoose" />
import { AuthService } from './auth.service';
import { ChangePasswordDto, ForgetPasswordDto, LoginDto, OtpDto, OtpLoginDto, RegisterDto, ResetPasswordDto, SocialLoginDto, VerifyForgetPasswordDto, VerifyOtpDto } from './dto/create-auth.dto';
import { MailService } from 'src/mail/mail.service';
export declare class AuthController {
    private readonly authService;
    private mailService;
    constructor(authService: AuthService, mailService: MailService);
    createAccount(registerDto: RegisterDto): Promise<import("./dto/create-auth.dto").AuthResponse>;
    login(loginDto: LoginDto): Promise<import("./dto/create-auth.dto").AuthResponse>;
    socialLogin(socialLoginDto: SocialLoginDto): Promise<import("./dto/create-auth.dto").AuthResponse>;
    otpLogin(otpLoginDto: OtpLoginDto): Promise<import("./dto/create-auth.dto").AuthResponse>;
    sendOtpCode(otpDto: OtpDto): Promise<import("./dto/create-auth.dto").OtpResponse>;
    verifyOtpCode(verifyOtpDto: VerifyOtpDto): Promise<import("./dto/create-auth.dto").CoreResponse>;
    forgetPassword(forgetPasswordDto: ForgetPasswordDto): Promise<import("./dto/create-auth.dto").CoreResponse>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<import("./dto/create-auth.dto").CoreResponse>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<import("./dto/create-auth.dto").CoreResponse>;
    logout(): Promise<boolean>;
    verifyForgetPassword(verifyForgetPasswordDto: VerifyForgetPasswordDto): Promise<import("./dto/create-auth.dto").CoreResponse>;
    me(req: any): Promise<import("mongoose").Document<unknown, any, import("../users/entities/user.entity").User> & import("../users/entities/user.entity").User & {
        _id: string;
    }>;
    addWalletPoints(addPointsDto: any): void;
    contactUs(input: any): Promise<{
        success: boolean;
        message: string;
    }>;
    mail({ name, email, subject, description }: {
        name: any;
        email: any;
        subject: any;
        description: any;
    }): Promise<void>;
}
