import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

// @Module({
  @Module({
    imports: [
      ConfigService, 
      ConfigModule.forRoot(),
      MailerModule.forRoot({
        // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
        // or
        transport: {
          // host: 'smtp.google.com',
          service: 'Gmail',
          secure: false,
          auth: {
            user: 'realbenneh@gmail.com',
            pass: 'Blia@12345',
          },
          tls:{
            rejectUnauthorized:false,
        }
        },
        // defaults: {
        //   from: '"No Reply" <noreply@example.com>',
        // },
        // template: {
        //   dir: join(__dirname, 'templates'),
        //   adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    ],
  //   providers: [MailService],
  //   exports: [MailService], // 👈 export for DI
  // }),
  // imports: [ConfigService,  ConfigModule.forRoot()],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
