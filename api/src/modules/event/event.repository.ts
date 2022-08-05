import { Repository } from '../../core/Repository/Repository';
import { EVENT_ERROR } from './event.constans';
import { EventModel } from '../../models/EventModel';
import { EventStatus } from './event.typedefs';

interface CreateOptions {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  capacity: number;
  minCapacity: number;
  cityId: number;
  googlePlaceId?: string;
  creatorId: number;
  logo?: string;
  status: EventStatus;
}

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

  async create(options: CreateOptions): Promise<EventModel> {
    return this.models.EventModel.create(
      { ...options },
      { returning: true, raw: true }
    );
  }

  async update(id: number, options: Partial<EventModel>): Promise<EventModel> {
    const [, res] = await this.models.EventModel.update(
      options,
      { where: { id }, returning: true, }
    );

    return res[0];
  }
}
