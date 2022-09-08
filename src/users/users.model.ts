import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface UserCreationAttributes {
  email?: string;
  roles?: string[];
  password?: string;
  name: string;
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

  @ApiProperty({ example: 'Name', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '[Role]', description: 'Роли пользователя' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  roles: string[];

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: true,
  // })
  // @HasMany(() => Request)
  // requests: Request[];
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshToken?: string;
}
