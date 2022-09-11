import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { Service } from './services/services.model';
import { ApplicationModule } from './applications/applications.module';
import { UsersModule } from './users/users.module';
import { Application } from './applications/application.model';
import { User } from './users/users.model';
import { APP_FILTER } from '@nestjs/core';
import { AllErrorsHandler } from './utils/all-errors-handler';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Service, Application, User],
      autoLoadModels: true,
      synchronize: true,
    }),
    ServicesModule,
    ApplicationModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllErrorsHandler,
    },
  ],
})
export class AppModule {}
