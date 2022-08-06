import { Repository } from '../../core/Repository/Repository';
import { UserEvent } from '../../models/UserEvent';
import { UserEventStatus } from './userEvent.typedefs';
import { User } from '../../models/User';

interface FindByUserIdAndEventIdOptions {
  userId: number;
  eventId: number;
}

interface CreateOptions {
  eventId: number;
  userId: number;
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
      throw Error('User event not found');
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
