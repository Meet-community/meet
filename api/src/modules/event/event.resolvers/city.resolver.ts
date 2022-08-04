import { Resolver } from '../../../core/resolvers/makeResolver';
import { City } from '../../../models/City';
import { EventModel } from '../../../models/EventModel';
import { CityRepository } from '../../City/city.repository';

export const cityResolver: Resolver<
  Promise<City>,
  undefined,
  EventModel
> = (event, _, ctx) => {
  const cityRepository = new CityRepository(ctx);

  return cityRepository.getById(event.cityId);
};
