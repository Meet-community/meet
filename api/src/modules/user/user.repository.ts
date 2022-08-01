import { Repository } from '../../core/Repository/Repository';
import { User } from '../../models/User';
import { USER_ERROR } from './user.constans';

export class UserRepository extends Repository {
  findById(id: number): Promise<User | null> {
    return this.models.User.findByPk(id, { raw: true });
  }

  async getById(id: number): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      throw Error(USER_ERROR.NotFound);
    }

    return user;
  }

  async update(id: number, options: Partial<User>): Promise<User> {
    const [, [user]] = await this.models.User.update(
      options,
      { where: { id }, returning: true, }
    );

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.models.User.findOne({
      where: { email },
      raw: true,
    });

    if (!user) {
      throw Error(USER_ERROR.NotFound);
    }

    return user;
  }
}
