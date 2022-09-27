import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Index,
  Table,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './User';
import { EventModel } from './EventModel';
import { UserEventStatus } from '../modules/userEvent/userEvent.typedefs';
import { ModelBase } from './ModelBase';

@Table({
  tableName: 'user_events',
})
export class UserEvent extends ModelBase {
  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => EventModel)
  event: EventModel;

  @ForeignKey(() => User)
  @Index('user_events_user_id')
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @ForeignKey(() => EventModel)
  @Index('user_events_event_id')
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'event_id',
  })
  eventId: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(UserEventStatus)),
  })
  status: UserEventStatus;
}
