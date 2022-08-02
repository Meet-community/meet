import { Ctx } from '../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import { Resolver } from '../../../core/resolvers/makeResolver';
import {
  GooglePlaceService
} from '../../../services/googlePlaceService/GooglePlaceService';

export const eventsResolver: Resolver<
  Promise<EventModel[]>
> = async (_, __, ctx: Ctx ) => {
  const googlePlaceService = new GooglePlaceService();

  await googlePlaceService.getCityByGoogleId('ChIJRbeALq1JOkcR1HJifj-sRfc');

  return ctx.models.EventModel.findAll({
    order: [['startAt', 'ASC']],
    raw: true,
  });
};
