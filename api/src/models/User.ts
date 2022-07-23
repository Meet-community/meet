import {
  AllowNull,
  Column, CreatedAt,
  DataType,
  Model,
  Table, UpdatedAt
} from 'sequelize-typescript';

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
  @CreatedAt
  @Column({
    field: 'created_at',
  })
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column({
    field: 'updated_at',
  })
  updatedAt: Date;
}
