import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { sendEmailConfirm } from './templates/emailConfirm/sendEmailConfirm';
import {
  sendForgotPasswordConfirm
} from './templates/forgotPasswordConfirm/sendForgotPasswordConfirm';

dotenv.config({ path: '.env' });

const host = process.env.SMPT_HOST as string;
const port = Number(process.env.SMPT_PORT);
const user = process.env.SMPT_USER as string;
const pass = process.env.SMPT_PASSWORD as string;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user,
    pass,
  },
});

interface Options {
  email: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendEmail = async (options: Options) => {
  const { email, subject, html, text } = options;

  return await transporter.sendMail({
    from: 'Meet Up to easy 🚀',
    to: email,
    subject,
    text,
    html,
  });
};

export const emailService = {
  send: sendEmail,
  sendEmailConfirm,
  sendForgotPasswordConfirm,
};




