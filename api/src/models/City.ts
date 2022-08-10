import {
  AllowNull, AutoIncrement,
  Column,
  DataType, Index,
  Model, PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'cities',
  timestamps: false,
})

export class City extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @AllowNull(false)
  @Index('cities_google_id')
  @Column({
    type: DataType.STRING,
    field: 'google_id',
  })
  googleId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;
}
