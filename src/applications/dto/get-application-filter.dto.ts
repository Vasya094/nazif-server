import { IsOptional, IsString } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsString()
  workerUserId?: string;

  @IsOptional()
  @IsString()
  clientUserId?: string;

  @IsOptional()
  full_info?: string;
}
