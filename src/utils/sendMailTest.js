
import nodemailer from 'nodemailer';
import config from '../config/config.js';


class SendMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
        host: config.test_mail_host,
        port: config.test_mail_port,
        secure:false,
        auth: {
          user: config.test_mail_user,
          pass: config.test_mail_pass
        }
      });
  }

  async sendMailSimple(to, subject, text) {
    let descripcion;
    let title;


    const info = await this.transporter.sendMail({
      from: config.test_mail_from,
      to,
      subject,
      text
    })
    
  }
}

export default new SendMail();