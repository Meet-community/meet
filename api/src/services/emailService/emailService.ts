import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { sendEmailConfirm } from './templates/emailConfirm/sendEmailConfirm';
import { sendForgotPasswordConfirm } from './templates/forgotPasswordConfirm/sendForgotPasswordConfirm';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';

dotenv.config({ path: '.env' });

const host = getEnvVariable(ENV.SMPTHost);
const port = Number(getEnvVariable(ENV.SMPTPort));
const user = getEnvVariable(ENV.SMPTUser);
const pass = getEnvVariable(ENV.SMPTPassword);

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




