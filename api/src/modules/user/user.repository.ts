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
}
