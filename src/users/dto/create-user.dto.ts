import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
  readonly email?: string;
  @IsOptional()
  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password?: string;
  @ApiProperty({ example: 'Name', description: 'Имя' })
  @IsString()
  readonly firstName: string;
  @ApiProperty({ example: 'Surname', description: 'Фамилия' })
  @IsString()
  readonly lastName: string;
  @ApiProperty({ example: '453462', description: 'Номер телефона' })
  @IsPhoneNumber()
  readonly phone: string;
  @IsOptional()
  @ApiProperty({ example: '["user"]', description: 'Роли пользователя' })
  readonly roles?: Array<string> = ['user'];
  readonly refreshToken?: string;
}
