import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from './dto/user-login.dto';
import { v4 as uuid } from 'uuid';
import  crypto = require("crypto");
import { TokenService } from '../token/token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto'; // 模块导入机制
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly tokenService: TokenService
    ) {}

  async login(userLoginDto: UserLoginDto) {
    let user: User
    const count = await this.usersRepository.count();
    if (count === 0) { // 用户表中没有数据, 初次登录直接创建用户
      const userId = uuid();
      user = await this.usersRepository.save({
        id: userId,
        ...userLoginDto,
        password: this.cryptPassword(userLoginDto.password), // 密码加盐
        creator: userId,
        lastUpdater: userId,
      });
    } else {
      user = await this.usersRepository.findOne({ where: { userName: userLoginDto.userName } });
      if (!user) {
        throw new HttpException('用户不存在', 400);
      } else if (this.cryptPassword(userLoginDto.password) !== user.password) {
        throw new HttpException('密码错误', 400);
      }
    }
    const payload = {
      userId: user.id,
      userName: user.userName,
      isAdmin: user.id === user.creator
    }
    return this.tokenService.genTokens(payload)
  }

  refreshToken(refreshTokenDto: RefreshTokenDto) {
    const payload = this.tokenService.validateRefreshToken(refreshTokenDto.refreshToken)

    if(payload){
      return this.tokenService.genTokens({
        userName: payload.userName,
        userId: payload.userId,
        isAdmin: payload.isAdmin
      })
    }else {
      throw new HttpException("refreshToken无效",401)
    }
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.password = this.cryptPassword(createUserDto.password);
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll() {
    const [records, total] = await this.usersRepository.findAndCount();
    return { records, total };
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    } else return user;
  }

  update(updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(updateUserDto.id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.usersRepository.softRemove(user);
  }

  // 密码加盐
  cryptPassword(password: string): string {
    const salt = 'KING_STAR_PASSWORD';
    return crypto.createHash('md5').update(password + salt).digest('hex');
  }
}
