import { Resolver } from '../../../core/resolvers/makeResolver';
import { UserRepository } from '../user.repository';
import { v4 as uuidV4 } from 'uuid';
import { emailService } from '../../../services/emailService/emailService';
import { hashService } from '../../../services/hashService/hashService';
import { UserStatus } from '../user.typedefs';
import {
  ClientError,
  ClientErrorTypes
} from '../../../core/ClientError/ClientError';
import { USER_ERROR } from '../user.constans';

interface Options {
  args: {
    temporaryPassword: string;
    email: string;
  };
}

export const forgotUserPasswordResolver: Resolver<
  Promise<boolean>,
  Options
> = async (_, options, ctx) => {
  const { temporaryPassword, email } = options.args;
  const userRepository = new UserRepository(ctx);

  const user = await userRepository.getByEmail(email);

  if (user.status !== UserStatus.Confirmed) {
    throw new ClientError({
      type: ClientErrorTypes.BadRequest,
      message: USER_ERROR.EmailNotConfirmed,
      fields: { email: user.email },
    });
  }

  const token = uuidV4();

  const hashedPassword = await hashService.hashPassword(temporaryPassword);

  await userRepository.update(
    user.id, { temporaryPassword: hashedPassword, token }
  );

  await emailService.sendForgotPasswordConfirm({ token, email });

  return true;
};
