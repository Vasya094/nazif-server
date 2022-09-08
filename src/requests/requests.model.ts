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
import { Location } from './dto/create-request.dto';

interface ServiceCreationAttrs {
  title: string;
  description: string;
}

// location: LocationModel
// worker: UserModel
// client: UserModel
// createdAt: Date
// updatedAt: Date

@Table({ tableName: 'requests' })
export class Request extends Model<Request, ServiceCreationAttrs> {
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
    example: 'e55cb6ea-24bd-11ed-861d-0242ac120002',
    description: 'Ссылка на исполнителя услуги',
  })
  @Column({ type: DataType.JSON })
  location: Location;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  workerUserId: string;
  @ApiProperty({
    example: 'e55cb6ea-24bd-11ed-861d-0242ac120002',
    description: 'Ссылка на исполнителя услуги',
  })
  @BelongsTo(() => User)
  worker: User;
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  clientUserId: string;
  @ApiProperty({
    example: 'e55cb6ea-24bd-11ed-861d-0242ac120002',
    description: 'Ссылка на заказчика услуги',
  })
  @BelongsTo(() => User)
  client: User;
}
