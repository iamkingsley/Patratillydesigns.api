import { JwtStrategy } from './jwt.strategy';
import { PassportModule, AuthModuleOptions } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from './../users/users.module';
import { authProviders } from './database/auth.providers';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule.register({
      imports: [AuthModuleOptions],
      session: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...authProviders,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
