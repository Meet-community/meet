import {
  AllowNull,
  Column, CreatedAt,
  DataType, Default,
  Model,
  Table, Unique, UpdatedAt
} from 'sequelize-typescript';
import { EventStatus } from '../modules/event/event.typedefs';
import { UserStatus } from '../modules/user/user.typedefs';

@Table({
  tableName: 'users',
  timestamps: false,
})

export class User extends Model<User> {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'first_name',
  })
  firstName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    field: 'last_name',
  })
  lastName: string;

  @AllowNull(false)
  @Default(UserStatus.Pending)
  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
  })
  status: UserStatus;

  @Column({
    type: DataType.STRING,
  })
  token?: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

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
}
