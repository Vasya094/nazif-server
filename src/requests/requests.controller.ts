import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';
import { RequestService } from './requests.service';

@Controller('request')
@ApiTags('Заявка или запрос на получение услуги')
export class RequestController {
  constructor(private requestsService: RequestService) {}

  @ApiOperation({ summary: 'Создание запроса или заявки на получение услуги' })
  @ApiResponse({ status: 200, type: Request })
  @Post()
  createRequest(@Body() requestDto: CreateRequestDto) {
    return this.requestsService.createRequest(requestDto);
  }
  @ApiOperation({ summary: 'Получение заявок' })
  @ApiResponse({ status: 200, type: [Request] })
  @Get()
  getRequests() {
    return this.requestsService.getRequests();
  }
}
