import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { ApplicationController } from './applications.controller';
import { Application } from './application.model';
import { ApplicationService } from './applications.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService],
  imports: [SequelizeModule.forFeature([Application, User])],
})
export class ApplicationModule {}
