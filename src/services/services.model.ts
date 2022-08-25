import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface ServiceCreationAttrs {
  title: string;
  description: string;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, ServiceCreationAttrs> {
  @ApiProperty({
    example: 'e55cb6ea-24bd-11ed-861d-0242ac120002',
    description: 'Уникальный идентификатор',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Car wash', description: 'заголовок услуги' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;
  @ApiProperty({ example: 'Info about...', description: 'Описание' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: './icon.png', description: 'Иконка услуги' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue:
      'https://www.dreamstime.com/fresh-icon-blue-spray-water-drop-vector-illustration-isolated-white-background-image183205664',
  })
  icon: string;
}
