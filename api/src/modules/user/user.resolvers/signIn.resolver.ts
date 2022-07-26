import { UserStatus } from '../user.typedefs';
import { USER_ERROR } from '../user.constans';
import { User } from '../../../models/User';
import { jwtService } from '../../../services/jwtService/jwtService';
import { Resolver } from '../../../core/resolvers/makeResolver';

interface Args {
  email: string;
  password: string;
}

interface Options {
  args: Args;
}

type Result = User;

export const signInResolver: Resolver<
  Promise<Result>,
  Options
> = async (_, { args }, { models, res }) => {
  const { email, password } = args;

  const user = await models.User.findOne({
    where: { email },
    raw: true,
  });

  if (!user) {
    throw Error(USER_ERROR.InvalidEmail);
  }

  if (user.status !== UserStatus.Confirmed) {
    throw Error(USER_ERROR.EmailNotConfirmed);
  }

  if (user.password !== password) {
    throw Error(USER_ERROR.InvalidPassword);
  }

  const jwt = jwtService.generateAccessToken(user);

  res.cookie('Authorization', jwt, {
    secure: true,
    httpOnly: true,
  });

  return user;
};
