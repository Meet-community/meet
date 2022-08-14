import { Repository } from '../../core/Repository/Repository';
import { UserEvent } from '../../models/UserEvent';
import { UserEventStatus } from './userEvent.typedefs';
import { User } from '../../models/User';
import {
  ClientError,
  ClientErrorTypes
} from '../../core/ClientError/ClientError';
import { USER_EVENT_ERROR } from './userEvent.constans';

interface FindByUserIdAndEventIdOptions {
  userId: number;
  eventId: number;
}

interface CreateOptions {
  eventId: number;
  userId: number;
  status: UserEventStatus;
}

export class UserEventRepository extends Repository {
  findByUserIdAndEventId(
    { userId, eventId }: FindByUserIdAndEventIdOptions
  ): Promise<UserEvent | null> {
    return this.models.UserEvent.findOne({
      where: {
        userId, eventId
      },
      raw: true,
    });
  }

  async getByUserIdAndEventId(
    { userId, eventId }: FindByUserIdAndEventIdOptions
  ): Promise<UserEvent> {
    const userEvent = await this.findByUserIdAndEventId(
      { eventId, userId }
    );

    if (!userEvent) {
      throw new ClientError({
        type: ClientErrorTypes.NotFound,
        message: USER_EVENT_ERROR.NotFound,
        fields: { userId, eventId }
      });
    }

    return  userEvent;
  }

  async findEventParticipants(eventId: number): Promise<User[]> {
    return this.models.User.findAll({
      include: [{
        model: UserEvent,
        required: true,
        where: {
          eventId,
          status: UserEventStatus.Pending,
        },
        attributes: [],
      }],
      raw: true,
    });
  }

  async update(id: number, options: Partial<UserEvent>): Promise<UserEvent> {
    const [, [userEvent]] = await this.models.UserEvent.update(
      options,
      {
        where: { id },
        returning: true,
      }
    );

    return userEvent;
  }

  async create(options: CreateOptions): Promise<UserEvent> {
    return this.models.UserEvent.create(
      { ...options },
      { returning: true, raw: true }
    );
  }
}
