import { createTransport } from 'nodemailer';
import { MailEntity } from './mail.entity';

export class MailerService {
  constructor(private poolConfig: string) {
    this.poolConfig = process.env.SMTP_TRANSPORT;
  }

  async sendMail(mailEntity: MailEntity) {
    const transporter = createTransport(this.poolConfig);
    return await transporter.sendMail({
      from: mailEntity.from,
      to: mailEntity.to,
      subject: mailEntity.subject,
      html: mailEntity.html,
    });
  }
}
