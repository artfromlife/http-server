import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @ApiProperty( { description: '用户ID' })
  @IsNotEmpty({ message: '用户ID不能为空' })
  @IsUUID()
  id: string

}
