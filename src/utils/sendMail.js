
import nodemailer from 'nodemailer';
import config from '../config/config.js';
//import { welcomeTemplate } from '../templates/welcome.js';

class SendMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
        host: config.mail_host,
        port: config.mail_port,
        secure:false,
        auth: {
          user: config.mail_user,
          pass: config.mail_pass
        }
      });
  }

  async sendMailSimple(to, subject, text) {
    let descripcion;
    let title;
/*
    switch(subject) {
      case 'Welcome':
        title = 'Welcome to my app';
        descripcion = `Welcome ${user.username} to my app`;
        break;

      default:
        break;

    }*/

    const info = await this.transporter.sendMail({
      from: config.MAIL_FROM,
      to,
      subject,
      text
      // html: welcomeTemplate(title, descripcion, user)
    })
    
  }
}

export default new SendMail();