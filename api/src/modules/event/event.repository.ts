import { Repository } from '../../core/Repository/Repository';
import { EVENT_ERROR } from './event.constans';
import { EventModel } from '../../models/EventModel';
import { EventStatus } from './event.typedefs';
import { Op } from 'sequelize';
import { City } from '../../models/City';
import { UserEvent } from '../../models/UserEvent';
import { UserEventStatus } from '../userEvent/userEvent.typedefs';
import { getDate } from '../../helpers/date/getDate';

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
  creatorId?: number;
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
    const { googleCityIds, creatorId } = filters;
    const creatorFilter = creatorId
      ? { creatorId }
      : {};

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
        startAt: { [Op.gt]: today },
        ...creatorFilter,
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

  async getArchiveEvents(filters: { userId: number }): Promise<EventModel[]> {
    const { userId } = filters;

    const today = new Date();
    const twoWeeksAgo = getDate(-14);

    return this.models.EventModel.findAll({
      where: {
        [Op.and]: [
          { endAt: { [Op.lt]: today } },
          { endAt: { [Op.gt]: twoWeeksAgo } },
        ],
      },
      include: [{
        model: UserEvent,
        where: {
          status: { [Op.not]: UserEventStatus.Canceled },
          userId: userId,
        },
        required: true,
        attributes: [],
      }],
      order: [['endAt', 'DESC']],
      raw: true,
    });
  }

  async getPlannedEvents(filters: { userId: number }): Promise<EventModel[]> {
    const { userId } = filters;

    const today = new Date();

    return this.models.EventModel.findAll({
      where: {
        endAt: { [Op.gt]: today },
      },
      include: [{
        model: UserEvent,
        where: {
          status: { [Op.not]: UserEventStatus.Canceled },
          userId: userId,
        },
        required: true,
        attributes: [],
      }],
      order: [['endAt', 'DESC']],
      raw: true,
    });
  }
}
