import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { from, map, of } from 'rxjs';
import { Op } from 'sequelize';
import { getShortenedUsersInfo } from 'src/utils/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.userRepository.create({ ...dto, roles: ['user'] });
  }

  getAllUsers(limit: number, offset = 0, search = '') {
    const sqlSearch = '%'.concat(search).concat('%');
    return from(
      this.userRepository.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['password', 'refreshToken'] },
        where: {
          name: {
            [Op.like]: sqlSearch,
          },
        },
        distinct: true,
      }),
    ).pipe(
      map((res) => ({
        total: res.count,
        data: getShortenedUsersInfo(res.rows),
      })),
    );
  }

  getUserById(id: number) {
    return from(
      this.userRepository.findByPk(id, {
        attributes: { exclude: ['password'] },
      }),
    );
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async updateUser(id: number, dto: CreateUserDto) {
    return of(this.userRepository.update(dto, { where: { id } }));
  }

  async updateUserRefreshToken(id: number, refreshToken) {
    return await this.userRepository.update(
      { refreshToken },
      { where: { id } },
    );
  }

  async clearRefreshToken(userId: number) {
    await this.userRepository.update(
      { refreshToken: null },
      {
        where: { id: userId, refreshToken: { [Op.not]: null } },
      },
    );
  }
}
