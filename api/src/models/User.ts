import {
  AllowNull, Column, DataType, Default, HasMany, Table, Unique
} from 'sequelize-typescript';
import { UserStatus } from '../modules/user/user.typedefs';
import { UserEvent } from './UserEvent';
import { ModelBase } from './ModelBase';

@Table({
  tableName: 'users',
})

export class User extends ModelBase {
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
    validate: {
      isEmail: true,
    }
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.TEXT,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    field: 'temporary_password'
  })
  temporaryPassword?: string | null;

  @Column({
    type: DataType.STRING,
  })
  telegram?: string | null;

  @Column({
    type: DataType.STRING,
  })
  facebook?: string | null;

  @Column({
    type: DataType.STRING,
  })
  instagram?: string | null;
}
