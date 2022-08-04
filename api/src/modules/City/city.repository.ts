import { Repository } from '../../core/Repository/Repository';
import { City } from '../../models/City';

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
}
