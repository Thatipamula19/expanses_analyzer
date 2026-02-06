import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // true only for port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  private async sendMail(options: nodemailer.SendMailOptions) {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM,
        ...options,
      });
    } catch (error) {
      console.error('Mail Error:', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }

  async sendPasswordResetMail(email: string, resetLink: string) {
    await this.sendMail({
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset Request</h2>
          <p>Click the button below to reset your password:</p>
          <p>
            <a href="${resetLink}"
               style="background:#2563eb;color:#fff;padding:10px 16px;
               text-decoration:none;border-radius:4px;">
              Reset Password
            </a>
          </p>
          <p>This link will expire in 15 minutes.</p>
          <p>If you didn’t request this, please ignore this email.</p>
        </div>
      `,
    });
  }
}
