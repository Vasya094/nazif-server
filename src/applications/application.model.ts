import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';
import { CreateApplicationDto, Location } from './dto/create-application.dto';

@Table({ tableName: 'applications' })
export class Application extends Model<Application, CreateApplicationDto> {
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
  @ApiProperty({
    example: `{
      "lat": 37,
      "lng": 60.57,
      "address": "string"
    }`,
    description: 'Информация о местоположении',
  })
  @Column({ type: DataType.JSON })
  location: Location;

  @ApiProperty({
    example: 'e55cb6ea-24bd-11ed-861d-0242ac120002',
    description: 'Ссылка на исполнителя услуги',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  workerUserId: string;

  @BelongsTo(() => User, 'workerUserId')
  worker: User;

  @ApiProperty({
    example: 'e55cb6ea-24bd-11ed-861d-0242ac120002',
    description: 'Ссылка на заказчика услуги',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  clientUserId: string;

  @BelongsTo(() => User, 'clientUserId')
  client: User;
}
