import { Repository } from '../../core/Repository/Repository';
import { UserEvent } from '../../models/UserEvent';

interface FindByUserIdAndEventIdOptions {
  userId: number;
  eventId: number;
}

export class UserEventRepository extends Repository {
  findByUserIdAndEventId(
    { userId, eventId }: FindByUserIdAndEventIdOptions
  ): Promise<UserEvent> {
    return this.models.UserEvent.findOne({ where: {
        userId, eventId
    }})
  }
}
