import {
  AllowNull, AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Index,
  Model, PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from './User';
import { EventStatus } from '../modules/event/event.typedefs';
import { City } from './City';


@Table({
  tableName: 'events',
})
export class EventModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @BelongsTo(() => User)
  creator: User | null;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Index('events_creator_id')
  @Column({
    field: 'creator_id',
  })
  creatorId: number;

  @BelongsTo(() => City)
  city: City | null;

  @AllowNull(false)
  @ForeignKey(() => City)
  @Index('events_city_id')
  @Column({
    field: 'city_id',
  })
  cityId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
  })
  logo: string;

  @AllowNull(false)
  @Column({
    field: 'start_at',
    type: DataType.DATE,
  })
  startAt: Date;

  @AllowNull(false)
  @Column({
    field: 'end_at',
    type: DataType.DATE,
  })
  endAt: Date;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    validate: { min: 0 },
  })
  capacity: number;

  @AllowNull(false)
  @Column({
    field: 'min_capacity',
    type: DataType.INTEGER,
    validate: { min: 0 },
  })
  minCapacity: number;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(EventStatus)),
  })
  status: EventStatus;

  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: DataType.STRING,
    field: 'google_place_id',
  })
  googlePlaceId?: string;

  @Column({
    type: DataType.STRING,
    field: 'event_link',
  })
  eventLink?: string;
}
