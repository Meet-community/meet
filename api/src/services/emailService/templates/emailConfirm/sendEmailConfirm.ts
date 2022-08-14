import { sendEmail } from '../../emailService';
import { getEmailConfirmTemplate } from './emailConfirm';
import { ENV, getEnvVariable } from '../../../../helpers/getEnvVariable';

interface Options {
  token: string;
  email: string;
}

export const sendEmailConfirm = ({ token, email }: Options) => {
  const clientURL = getEnvVariable(ENV.ClientUrl);
  const confirmLink = `${clientURL}/activate/${token}`;

  return sendEmail({
    email,
    subject: 'Confirm Email',
    html: getEmailConfirmTemplate({ confirmLink })
  });
};
