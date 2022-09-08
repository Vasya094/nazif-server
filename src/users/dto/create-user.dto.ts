import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Почта' })
  readonly email?: string;
  @ApiProperty({ example: '1234', description: 'Пароль' })
  readonly password?: string;
  @ApiProperty({ example: 'Name', description: 'Полное имя' })
  readonly name?: string;
  @IsOptional()
  @ApiProperty({ example: '["user"]', description: 'Роли пользователя' })
  readonly roles: Array<string> = ['user'];
  readonly refreshToken?: string;
}
