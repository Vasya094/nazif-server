import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { RequestController } from './requests.controller';
import { Request } from './requests.model';
import { RequestService } from './requests.service';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [SequelizeModule.forFeature([Request, User])],
})
export class RequestModule {}
