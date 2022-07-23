import { sendEmail } from '../../emailService';
import { getEmailConfirmTemplate } from './emailConfirm';

interface Options {
  token: string;
  email: string;
}

export const sendEmailConfirm = ({ token, email }: Options) => {
  const confirmLink = `${process.env.CLIENT_URL}/activate/${token}`

  return sendEmail({
    email,
    subject: 'Confirm Email',
    html: getEmailConfirmTemplate({ confirmLink })
  })
}
