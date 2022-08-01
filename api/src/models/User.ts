import {
  AllowNull, AutoIncrement,
  Column, CreatedAt,
  DataType, Default, HasMany,
  Model, PrimaryKey,
  Table, Unique, UpdatedAt
} from 'sequelize-typescript';
import { UserStatus } from '../modules/user/user.typedefs';
import { UserEvent } from './UserEvent';

@Table({
  tableName: 'users',
  timestamps: false,
})

export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @HasMany(() => UserEvent)
  userEvents: User[];

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
  token?: string | null;

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

  @Column({
    type: DataType.TEXT,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    field: 'temporary_password'
  })
  temporaryPassword?: string | null;
}
