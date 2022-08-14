import { v4 as uuidV4 } from 'uuid';
import { emailService } from '../../../services/emailService/emailService';
import { UserStatus } from '../user.typedefs';
import { User } from '../../../models/User';
import { Resolver } from '../../../core/resolvers/makeResolver';
import { hashService } from '../../../services/hashService/hashService';
import {
  ClientError,
  ClientErrorTypes
} from '../../../core/ClientError/ClientError';
import { USER_ERROR } from '../user.constans';

interface Args {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
}

interface Options {
  args: Args;
}

export const signUpResolver: Resolver<
  Promise<User>,
  Options
> = async (_, { args }, { models }) => {
  const { email, password } = args;

  const isEmailAlreadyTaken = await models.User.findOne({
    where: { email, status: UserStatus.Confirmed },
    raw: true,
  });

  if (isEmailAlreadyTaken) {
    throw new ClientError({
      type: ClientErrorTypes.BadRequest,
      message: USER_ERROR.EmailAlreadyExist,
      fields: { email },
    });
  }

  const isEmailAlreadyExist = await models.User.findOne({
    where: { email },
    raw: true,
  });

  const token = uuidV4();
  const hash = await hashService.hashPassword(password);

  let user;

  if (isEmailAlreadyExist) {
    [,[user]] = await models.User.update(
      { ...args, token, password: hash },
      {
        where: { email },
        returning: true,
      },
    );
  } else {
    user = await models.User.create(
      { ...args, token, password: hash },
      {
        raw: true,
        returning: true,
      },
    );
  }

  await emailService.sendEmailConfirm({ token, email });

  return user;
};
