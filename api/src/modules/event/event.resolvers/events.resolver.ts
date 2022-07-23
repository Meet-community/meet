import { Ctx } from '../../../../server/typedefs';
import { EventModel } from '../../../models/EventModel';
import {
  sendEmailConfirm
} from '../../../services/emailService/templates/emailConfirm/sendEmailConfirm';

export const eventsResolver = async (_, __, ctx: Ctx ): Promise<EventModel[]> => {
  return ctx.models.EventModel.findAll({
    order: [['startAt', 'ASC']],
    raw: true,
  })
}
