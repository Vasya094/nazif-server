import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create({ ...dto, roles: ['user'] });
  }

  getAllUsers(limit: number, offset = 0, search = '') {
    const sqlSearch = '%'.concat(search).concat('%');
    return this.userRepository.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['password', 'refreshToken'] },
      where: {
        fullName: {
          [Op.like]: sqlSearch,
        },
      },
      distinct: true,
    });
  }

  getUserById(id: string) {
    return this.userRepository.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  async deleteUser(id: string) {
    return await this.userRepository.destroy({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async updateUser(id: string, dto: CreateUserDto) {
    return this.userRepository.update(dto, { where: { id } });
  }

  async updateUserRefreshToken(id: number, refreshToken) {
    return await this.userRepository.update(
      { refreshToken },
      { where: { id } },
    );
  }

  async clearRefreshToken(userId: string) {
    await this.userRepository.update(
      { refreshToken: null },
      {
        where: { id: userId, refreshToken: { [Op.not]: null } },
      },
    );
  }
}
