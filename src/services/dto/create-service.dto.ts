import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Car wash', description: 'заголовок услуги' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле title обязательно для заполнения' })
  readonly title: string;
  @ApiProperty({ example: 'Info about...', description: 'Описание' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле description обязательно для заполнения' })
  readonly description: string;
  @ApiProperty({ example: './icon.png', description: 'Иконка услуги' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле icon обязательно для заполнения' })
  readonly icon: string;
}
