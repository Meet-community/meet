import { v4 as uuidV4 } from 'uuid';
import { emailService } from '../../../services/emailService/emailService';
import { UserStatus } from '../user.typedefs';
import { USER_ERROR } from '../user.constans';
import { User } from '../../../models/User';
import { Resolver } from '../../../core/resolvers/makeResolver';

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
  const { email } = args;

  const isEmailAlreadyTaken = await models.User.findOne({
    where: { email, status: UserStatus.Confirmed },
    raw: true,
  });

  if (isEmailAlreadyTaken) {
    throw Error(USER_ERROR.EmailAlreadyExist);
  }

  const isEmailAlreadyExist = await models.User.findOne({
    where: { email },
    raw: true,
  });

  const token = uuidV4();
  let user;

  if (isEmailAlreadyExist) {
    [,[user]] = await models.User.update(
      { ...args, token, },
      {
        where: { email },
        returning: true,
      },
    );
  } else {
    user = await models.User.create(
      { ...args, token },
      {
        raw: true,
        returning: true,
      },
    );
  }

  await emailService.sendEmailConfirm({ token, email });

  return user;
};
