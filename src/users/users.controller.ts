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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('search') search: string,
  ) {
    return this.userService.getAllUsers(limit, offset, search);
  }

  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: 'Редактирование информации о пользователе' })
  @ApiResponse({ status: 200, type: [User] })
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
