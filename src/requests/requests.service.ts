import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequestDto } from './dto/create-request.dto';
import { Request } from './requests.model';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request) private requestRepository: typeof Request,
  ) {}
  async createRequest(dto: CreateRequestDto) {
    const service = await this.requestRepository.create(dto);
    return service;
  }

  async getRequests() {
    const services = await this.requestRepository.findAll({
      include: { all: true },
    });
    return services;
  }

  async update(id: number, dto: CreateRequestDto) {
    return await this.requestRepository.update(dto, {
      where: { id },
    });
  }
}
