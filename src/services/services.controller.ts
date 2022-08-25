import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './services.model';
import { ServicesService } from './services.service';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Получить все предоставляемые услуги' })
  @ApiResponse({ status: 200, type: [Service] })
  // @Roles("ADMIN")
  //   @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.servicesService.getAllServices();
  }

  @ApiOperation({ summary: 'Создание услуги' })
  @ApiResponse({ status: 200, type: Service })
  @Post()
  createService(@Body() serviceDto: CreateServiceDto) {
    return this.servicesService.createService(serviceDto);
  }
}
