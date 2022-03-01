import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    send(mail: {
        to: any;
        subject: any;
        from: any;
        text: any;
        html?: string;
    }): Promise<void>;
}
