import { PERMISSIONS } from './../common/enums';
import { UsersService } from './../users/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import {
  AuthResponse,
  ChangePasswordDto,
  ForgetPasswordDto,
  LoginDto,
  CoreResponse,
  RegisterDto,
  ResetPasswordDto,
  VerifyForgetPasswordDto,
  SocialLoginDto,
  OtpLoginDto,
  OtpResponse,
  VerifyOtpDto,
  OtpDto,
  ErrorResponse,
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { CONTACT_MODEL } from 'src/common/constants';
import { Model } from 'mongoose';
import { Contact } from './entities/contact.entity';
import { SmsService } from 'src/sms/sms.service';
import otpGenerator from 'otp-generator';

@Injectable()
export class AuthService {
  otpData: string;

  constructor(
    @Inject(CONTACT_MODEL) private contactsRepository: Model<Contact>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private sms: SmsService,
    ) {}
    
  async register(createUserInput: RegisterDto): Promise<AuthResponse|ErrorResponse> {
    try {
      const userExists = await this.usersService
        .findByPhoneOrEmail(createUserInput)
      if (userExists) {
        return {
          success: false,
          message: 'text-user-exists'
        }
      }

      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
      const newUser = {
        id: uuidv4(),
        ...createUserInput,
        password: hashedPassword,
        permissions: [PERMISSIONS.CUSTOMER],
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      const user = await this.usersService.create(newUser);
      const { password, ...result } = user;
      const payload = { ...result, sub: user._id}
      return {
        token: this.jwtService.sign(payload),
        permissions: user.permissions,
      };
    } catch (error) {
      console.log(error)
      return error.message;
    }
      
    }
  

  async login(loginInput: LoginDto): Promise<AuthResponse|ErrorResponse> {
    const { email, password: plaintextPassword } = loginInput;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return {
      success: false,
      message: 'user with this email not found'
    };

    const isPasswordMatching = await bcrypt.compare(plaintextPassword, user.password);

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      const payload = { ...result, sub: user._id}
      return {
        token: this.jwtService.sign(payload),
        permissions: user.permissions,
      };
    }
    return {
      success: false,
      message: 'password is incorrect',
    }
  }
  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {

    return {
      success: true,
      message: 'Password change successful',
    };
  }

  async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }

  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }

  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    const { code } = verifyOtpInput
    console.log("code", code)
    if(code === this.otpData ){
      return {
        message: 'success',
        success: true,
      };
    }else {
      return {
        message: 'Wrong token number',
        success: false
      }
    }
  }
  
  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    console.log('sendOtpCode', otpInput)
    const otp = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false});
    console.log("otp", otp);
    this.otpData = otp
    await this.sms.sendSMS(otpInput.phone_number, otp);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'twilio',
      phone_number: otpInput.phone_number,
      is_contact_exist: true,
    };
  }

  async contactUs(input: Contact): Promise<Contact> {
    const createdContact = new this.contactsRepository(input);
    return createdContact.save();
  }

  me(req) {
    return this.usersService.findOne(req.user.userId)
  }
}
