import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export class CreateApplicationDto {
  @ApiProperty({
    example: `{
    "lat": 37,
    "lng": 60.57,
    "address": "string"
}`,
    description: 'Исполнитель',
  })
  @IsNotEmpty({ message: 'Информация о месте исполнения услуги' })
  readonly location: Location;
  @ApiProperty({
    example: 'b79bbf13-108c-45d0-b5f1-b9f453e6e620',
    description: 'Исполнитель',
  })
  @IsNotEmpty({ message: 'Поле workerUserId обязательно для заполнения' })
  readonly workerUserId: string;
  @ApiProperty({
    example: 'b79bbf13-108c-45d0-b5f1-b9f453e6e620',
    description: 'Заказчик',
  })
  @IsNotEmpty({ message: 'Поле clientUserId обязательно для заполнения' })
  readonly clientUserId: string;
}
