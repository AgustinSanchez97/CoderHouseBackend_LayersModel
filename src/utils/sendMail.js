
import nodemailer from 'nodemailer';
import config from '../config/config.js';


class SendMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service:"gmail",      
      port: 465,
      secure:true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS

        //user: config.mail_user,        
        //pass: config.mail_pass
      }
  });
}

  async sendMailSimple(to, subject, text) {
    let descripcion;
    let title;


    const info = await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text
    })
    
  }
}

export default new SendMail();