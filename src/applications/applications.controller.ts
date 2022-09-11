import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.model';
import { ApplicationService } from './applications.service';

@Controller('application')
@ApiTags('Заявка или запрос на получение услуги')
export class ApplicationController {
  constructor(private applicationsService: ApplicationService) {}

  @ApiOperation({ summary: 'Создание запроса или заявки на получение услуги' })
  @ApiResponse({ status: 200, type: Application })
  @Post()
  createApplication(@Body() ApplicationDto: CreateApplicationDto) {
    return this.applicationsService.createApplication(ApplicationDto);
  }
  @ApiOperation({ summary: 'Получение заявок' })
  @ApiResponse({ status: 200, type: [Application] })
  @Get()
  @ApiQuery({
    name: 'worker_id',
    description: 'Фильрация по id исполнителя услуги',
    required: false,
  })
  @ApiQuery({
    name: 'client_id',
    description: 'Фильрация по id заказчика услуги',
    required: false,
  })
  @ApiQuery({
    name: 'full_info',
    description: 'Получение полной информации о заказчике и исполнителе',
    required: false,
  })
  getApplications(
    @Query('worker_id') workerUserId?: string,
    @Query('client_id') clientUserId?: string,
    @Query('full_info') full_info?: string,
  ) {
    return this.applicationsService.getApplications({
      workerUserId,
      clientUserId,
      full_info,
    });
  }

  @ApiOperation({ summary: 'Получение заявки по ID' })
  @ApiResponse({ status: 200 })
  @Get(':id')
  getOneApplicationById(@Param('id') id: string) {
    return this.applicationsService.getApplicationById(id);
  }

  @ApiOperation({ summary: 'Редактирование заявки' })
  @ApiResponse({ status: 200 })
  @Put(':id')
  updateApplicationById(
    @Param('id') id: string,
    @Body() dto: CreateApplicationDto,
  ) {
    return this.applicationsService.updateApplication(id, dto);
  }

  @ApiOperation({ summary: 'Удаление заявки' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteApplication(@Param('id') id: string) {
    return this.applicationsService.deleteApplication(id);
  }
}
