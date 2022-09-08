import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { Service } from './services/services.model';
import { RequestModule } from './requests/requests.module';
import { UsersModule } from './users/users.module';
import { Request } from './requests/requests.model';
import { User } from './users/users.model';

@Module({
  controllers: [],
  providers: [],
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
      models: [Service, Request, User],
      autoLoadModels: true,
      synchronize: true,
    }),
    ServicesModule,
    RequestModule,
    UsersModule,
  ],
})
export class AppModule {}
