import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false,
})

export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    field: 'first_name',
  })
  firstName?: string;

  @Column({
    type: DataType.STRING,
    field: 'last_name',
  })
  lastName?: string;
}
