import { Service } from '../../core/Service/Service';
import { CityRepository } from './city.repository';
import { City } from '../../models/City';
import {
  GooglePlaceService
} from '../../services/googlePlaceService/GooglePlaceService';

interface EnsureCityOptions {
  googleId: string;
}

export class CityService extends Service {
  cityRepository = new CityRepository(this.ctx);

  googlePlaceService = new GooglePlaceService();

  async ensureCity({ googleId }: EnsureCityOptions): Promise<City> {
    const city = await this.cityRepository.findByGoogleId(googleId);

    if (city) {
      return city;
    }

    const { name, place_id } = await this.googlePlaceService.getCityByGoogleId(googleId);

    return this.cityRepository.create({
      name, googleId: place_id,
    });
  }
}
