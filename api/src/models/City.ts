import {
  AllowNull,
  Column,
  DataType, Index,
  Table,
} from 'sequelize-typescript';
import { ModelBase } from './ModelBase';

@Table({
  tableName: 'cities',
  timestamps: false,
})

export class City extends ModelBase {
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
