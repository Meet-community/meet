import { Repository } from '../../core/Repository/Repository';
import { EVENT_ERROR } from './user.constans';
import { EventModel } from '../../models/EventModel';

export class EventRepository extends Repository {
  findById(id: number): Promise<EventModel | null> {
    return this.models.EventModel.findByPk(id, { raw: true });
  }

  async getById(id: number): Promise<EventModel> {
    const event = await this.findById(id);

    if (!event) {
      throw Error(EVENT_ERROR.NotFound);
    }

    return event;
  }
}
