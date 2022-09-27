import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Model,
  PrimaryKey,
  UpdatedAt
} from 'sequelize-typescript';

export class ModelBase extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

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
