import { sendEmail } from '../../emailService';
import {
  gerForgotPasswordConfirmEmailTemplate,
} from './forgotPasswordConfirm';
import { ENV, getEnvVariable } from '../../../../helpers/getEnvVariable';

interface Options {
  token: string;
  email: string;
}

export const sendForgotPasswordConfirm = ({ token, email }: Options) => {
  const clientUrl = getEnvVariable(ENV.ClientUrl);
  const confirmLink = `${clientUrl}/forgotPassword/activate/${token}`;

  return sendEmail({
    email,
    subject: 'Reset password',
    html: gerForgotPasswordConfirmEmailTemplate({ confirmLink })
  });
};
