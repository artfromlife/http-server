import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  async findAll() {
    const [records,total] = await this.usersRepository.findAndCount()
    return { records, total }
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id
      }
    });
    if(!user){
      throw new NotFoundException('用户不存在')
    }else return user
  }

  update(updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(updateUserDto.id, updateUserDto)
  }

  async remove(id: string) {
    const user = await this.findOne(id)
    return this.usersRepository.softRemove(user)
  }
}
