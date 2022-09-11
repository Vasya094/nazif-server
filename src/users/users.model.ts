import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Application } from 'src/applications/application.model';

export interface UserCreationAttributes {
  email?: string;
  roles?: string[];
  password?: string;
  firstName: string;
  lastName: string;
}

@Table({ timestamps: false, tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Логин пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @ApiProperty({ example: '1234', description: 'Пароль пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @ApiProperty({ example: 'Vasya', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({
    example: '509023',
    description: 'Телефонный номер пользователя',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  phone: string;

  @ApiProperty({
    example: 'Vasya Petrov',
    description: 'Полное имя пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fullName: string;

  @ApiProperty({ example: 'Petrov', description: 'Фамилия пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @BeforeCreate
  @BeforeUpdate
  static addFullName(user: User): void {
    if (user.firstName && user.lastName) {
      user.fullName = `${user.firstName} ${user.lastName}`;
    }
  }

  @ApiProperty({ example: '[Role]', description: 'Роли пользователя' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  roles: string[];

  @HasMany(() => Application)
  acceptedApplications: Application[];

  @HasMany(() => Application)
  createdApplications: Application[];

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken?: string;
}
