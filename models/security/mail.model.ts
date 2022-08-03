import { createTransport } from 'nodemailer';
import { Config } from '../../utils/utils'
export class MailModel {
    mail_config:any;

    constructor() {
        let config = Config();
        this.mail_config = config['mail_config'];
    }

    async send(from:string, to:string[], subject:string, html:string) {
        try {
            from = from || this.mail_config.auth.user;
            let transporter = createTransport( this.mail_config ),
                options = {
                    from: from,// '"Wilson Hamilton" <wilsonhamiltond@gmail.com>'
                    to: to.join(','),// 'julioolivarestejeda@gmail.com, wilsonhamiltond@gmail.com'
                    subject: subject,
                    html: html
                };
            
            await transporter.sendMail(options, null);
        } catch (error) {
            console.log(error);
            throw error.message;
        }
    }
}