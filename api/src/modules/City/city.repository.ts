import { Repository } from '../../core/Repository/Repository';
import { City } from '../../models/City';
import {
  ClientError,
  ClientErrorTypes
} from '../../core/ClientError/ClientError';

interface CreateOptions {
  name: string;
  googleId: string;
}

export class CityRepository extends Repository {
  async findByGoogleId(googleId: string): Promise<City | null> {
    return this.models.City.findOne({
      where: { googleId },
      raw: true
    });
  }

  async create(options: CreateOptions): Promise<City> {
    return this.models.City.create(
      { ...options },
      { raw: true, returning: true }
    );
  }

  findById(id: number): Promise<City | null> {
    return this.models.City.findByPk(id, { raw: true });
  }

  async getById(id: number): Promise<City> {
    const city = await this.findById(id);

    if (!city) {
      throw new ClientError({
        type: ClientErrorTypes.NotFound,
        fields: { cityId: id },
      });
    }

    return city;
  }
}
