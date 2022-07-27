import { Repository } from '../../core/Repository/Repository';

export class EventRepository extends Repository {
  getById(id: number) {
    return this.models.EventModel.findOne({ where: { id } });
  }
}
