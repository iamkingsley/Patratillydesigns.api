import { Injectable } from '@nestjs/common';
import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = "AC41e1a65eb52f0406ed506faa9ee59bc0";
const TWILIO_AUTH_TOKEN = "1d59283763e34372f43c60931cb56e5b";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

@Injectable()
export class SmsService {
     async sendSMS(phone_number, otp){
        await client.messages.create({
            body: `Please use this otp code ${otp} to verify`,
            from: "+19034517308",
            to: phone_number,
        })
    }
}
