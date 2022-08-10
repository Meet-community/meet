import { Repository } from '../../core/Repository/Repository';
import { EVENT_ERROR } from './event.constans';
import { EventModel } from '../../models/EventModel';
import { EventStatus } from './event.typedefs';
import { Op } from 'sequelize';
import { City } from '../../models/City';

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

interface EventsFilters {
  googleCityIds?: number[];
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

  async getByFilters(filters: EventsFilters): Promise<EventModel[]> {
    const { googleCityIds } = filters;

    const citiesFilter = googleCityIds
      ?  [{
          model: City,
          required: true,
          where: {
            googleId: {
              [Op.in]: googleCityIds,
            }
          },
          attributes: []
        }]
      : [];

    const today = new Date();

    return this.models.EventModel.findAll({
      where: {
        startAt: { [Op.gt]: today }
      },
      include: [
        ...citiesFilter,
      ],
      order: [['startAt', 'ASC']],
      raw: true,
    });
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
