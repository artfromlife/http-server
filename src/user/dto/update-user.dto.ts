import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty( {
    description: 'user id'
  })
  id: string
}
