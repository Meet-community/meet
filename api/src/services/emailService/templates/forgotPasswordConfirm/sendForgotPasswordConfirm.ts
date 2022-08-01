import { sendEmail } from '../../emailService';
import {
  gerForgotPasswordConfirmEmailTemplate,
} from './forgotPasswordConfirm';

interface Options {
  token: string;
  email: string;
}

export const sendForgotPasswordConfirm = ({ token, email }: Options) => {
  const confirmLink = `${process.env.CLIENT_URL}/forgotPassword/activate/${token}`;

  return sendEmail({
    email,
    subject: 'Reset password',
    html: gerForgotPasswordConfirmEmailTemplate({ confirmLink })
  });
};
