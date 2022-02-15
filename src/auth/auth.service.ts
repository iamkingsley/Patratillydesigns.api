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
} from './dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import { CONTACT_MODEL } from 'src/common/constants';
import { Model } from 'mongoose';
import { Contact } from './entities/contact.entity';
@Injectable()
export class AuthService {

  constructor(
    @Inject(CONTACT_MODEL) private contactsRepository: Model<Contact>,
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async register(createUserInput: RegisterDto): Promise<AuthResponse> {
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
  }

  async login(loginInput: LoginDto): Promise<AuthResponse> {
    const { email, password: plaintextPassword } = loginInput;
    const user = await this.usersService.findOneByEmail(email);
    const isPasswordMatching = await bcrypt.compare(plaintextPassword, user.password);

    if (user && isPasswordMatching) {
      const { password, ...result } = user;
      const payload = { ...result, sub: user._id}
      return {
        token: this.jwtService.sign(payload),
        permissions: user.permissions,
      };
    }
    return null;
  }
  async changePassword(
    changePasswordInput: ChangePasswordDto,
  ): Promise<CoreResponse> {
    console.log(changePasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async forgetPassword(
    forgetPasswordInput: ForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(forgetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async verifyForgetPasswordToken(
    verifyForgetPasswordTokenInput: VerifyForgetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(verifyForgetPasswordTokenInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async resetPassword(
    resetPasswordInput: ResetPasswordDto,
  ): Promise<CoreResponse> {
    console.log(resetPasswordInput);

    return {
      success: true,
      message: 'Password change successful',
    };
  }
  async socialLogin(socialLoginDto: SocialLoginDto): Promise<AuthResponse> {
    console.log(socialLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }
  async otpLogin(otpLoginDto: OtpLoginDto): Promise<AuthResponse> {
    console.log(otpLoginDto);
    return {
      token: 'jwt token',
      permissions: ['super_admin', 'customer'],
    };
  }
  async verifyOtpCode(verifyOtpInput: VerifyOtpDto): Promise<CoreResponse> {
    console.log(verifyOtpInput);
    return {
      message: 'success',
      success: true,
    };
  }
  async sendOtpCode(otpInput: OtpDto): Promise<OtpResponse> {
    console.log(otpInput);
    return {
      message: 'success',
      success: true,
      id: '1',
      provider: 'google',
      phone_number: '+919494949494',
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
