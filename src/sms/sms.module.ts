import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { ConfigModule } from '@nestjs/config';
@Module({
    imports:[
        ConfigModule.forRoot({
        isGlobal: true,
    })],
  providers: [SmsService],
  controllers: [SmsController]
})
export class SmsModule {}
