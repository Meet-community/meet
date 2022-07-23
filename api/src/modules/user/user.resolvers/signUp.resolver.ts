import { Ctx } from '../../../../server/typedefs';
import { v4 as uuidV4 } from 'uuid';
import { emailService } from '../../../services/emailService/emailService';
import { UserStatus } from '../user.typedefs';
import { USER_ERROR } from '../user.constans';
import { raw } from 'express';
import { User } from '../../../models/User';

interface Args {
  email: string,
  password: string,
  lastName: string,
  firstName: string,
}

interface Options {
  args: Args
}

export const signUpResolver = async (
  _, { args }: Options, { models }: Ctx
): Promise<User> => {
  const { email } = args;

  const isUserExist = await models.User.findOne({
    where: { email, status: UserStatus.Confirmed },
    raw: true,
  })

  if (isUserExist) {
    throw Error(USER_ERROR.EmailAlreadyExist)
  }

  const isEmailAlreadyExist = await models.User.findOne({
    where: { email },
    raw: true,
  })

  const token = uuidV4();
  let user;

  if (isEmailAlreadyExist) {
    [,[user]] = await models.User.update(
      { ...args, token, },
      {
        where: { email },
        returning: true,
      },
    )
  } else {
    user = await models.User.create(
      { ...args, token },
      {
        raw: true,
        returning: true,
      },
    )
  }

  await emailService.sendEmailConfirm({ token, email })

  return user;
}
