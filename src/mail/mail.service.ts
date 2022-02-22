import { Injectable } from '@nestjs/common';
import SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}
    
    async send(mail: { to: any; subject: any; from: any; text: any; html?: string; }) {
        console.log("send mail", mail)
        await this.mailerService.sendMail({
            to: mail.to,
            text: mail.text,
            from: mail.from,
            subject: mail.subject,
          });
      }
}
