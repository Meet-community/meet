import { Repository } from '../../core/Repository/Repository';
import { UserEvent } from '../../models/UserEvent';
import { UserEventStatus } from './userEvent.typedefs';
import { User } from '../../models/User';

interface FindByUserIdAndEventIdOptions {
  userId: number;
  eventId: number;
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
}
