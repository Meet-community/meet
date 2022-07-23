import { sendEmail } from '../../emailService';
import { getEmailConfirmTemplate } from './emailConfirm';

interface Options {
  confirmLink: string;
  email: string;
}

export const sendEmailConfirm = ({ confirmLink, email }: Options) => {
  return sendEmail({
    email,
    subject: 'Confirm Email',
    html: getEmailConfirmTemplate({ confirmLink })
  })
}
