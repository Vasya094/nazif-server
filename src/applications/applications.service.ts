import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateApplicationDto } from './dto/create-application.dto';
import { GetTasksFilterDto } from './dto/get-application-filter.dto';
import { Application } from './application.model';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application) private applicationRepository: typeof Application,
  ) {}
  async createApplication(dto: CreateApplicationDto) {
    return await this.applicationRepository.create(dto);
  }

  async getApplications(filterDto: GetTasksFilterDto) {
    const { workerUserId, clientUserId, full_info } = filterDto;
    let where = {};
    let include;

    if (workerUserId) {
      where = { ...where, workerUserId };
    }
    if (clientUserId) {
      where = { ...where, clientUserId };
    }
    if (full_info && full_info.toLowerCase() === 'true') {
      include = [
        {
          model: User,
          as: 'worker',
          attributes: {
            exclude: ['refreshToken', 'password'],
          },
        },
        {
          model: User,
          as: 'client',
          attributes: {
            exclude: ['refreshToken', 'password', 'id'],
          },
        },
      ];
    }
    const applications = await this.applicationRepository.findAll({
      where,
      include,
    });
    return applications;
  }

  async update(id: number, dto: CreateApplicationDto) {
    return await this.applicationRepository.update(dto, {
      where: { id },
    });
  }

  async getApplicationById(id: string) {
    return await this.applicationRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async updateApplication(id: string, dto: CreateApplicationDto) {
    return await this.applicationRepository.update(dto, { where: { id } });
  }

  async deleteApplication(id: string) {
    return await this.applicationRepository.destroy({ where: { id } });
  }
}
