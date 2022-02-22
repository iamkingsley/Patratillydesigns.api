import { LocalAuthGuard } from './local.auth.guards';
import { Controller, Get, Post, Body, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  OtpDto,
  OtpLoginDto,
  RegisterDto,
  ResetPasswordDto,
  SocialLoginDto,
  VerifyForgetPasswordDto,
  VerifyOtpDto,
} from './dto/create-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MailService } from 'src/mail/mail.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private mailService: MailService) {}

  @Post('register')
  createAccount(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard) // instructs nestjs to use our LocalStrategy to login
  @Post('token') // login route
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('social-login-token')
  socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }

  @Post('otp-login')
  otpLogin(@Body() otpLoginDto: OtpLoginDto) {
    return this.authService.otpLogin(otpLoginDto);
  }

  @Post('send-otp-code')
  sendOtpCode(@Body() otpDto: OtpDto) {
    return this.authService.sendOtpCode(otpDto);
  }

  @Post('verify-otp-code')
  verifyOtpCode(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtpCode(verifyOtpDto);
  }

  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @Post('logout')
  async logout(): Promise<boolean> {
    return true;
  }

  @Post('verify-forget-password-token')
  verifyForgetPassword(
    @Body() verifyForgetPasswordDto: VerifyForgetPasswordDto,
  ) {
    return this.authService.verifyForgetPasswordToken(verifyForgetPasswordDto);
  }

  @UseGuards(JwtAuthGuard) // protects & and checks request for valid bear TOKEN
  @Get('me')
  me(@Req() req) {
    return this.authService.me(req);
  }

  @Post('add-points')
  addWalletPoints(@Body() addPointsDto: any) {
    // return this.authService.me();
  }

  @Post('contact-us')
  async contactUs(@Body() input: any) {
    await this.authService.contactUs(input);

    await this.mail(input)

    return {
      success: true,
      message: 'Thank you for contacting us. We will get back to you soon.',
    };
  }
  async mail({ name, email, subject, description}){
      const mail = {
        to: 'realbenneh@gmail.com',
        subject: subject,
        from: email,
        text: description,
        html: '<h1>Hello</h1>',
      };
      
      return await this.mailService.send(mail);
  }
}
