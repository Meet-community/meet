import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'notes',
  timestamps: false,
})

export class Note extends Model<Note> {
  @Column({
    type: DataType.STRING,
  })
  note?: string;
}
