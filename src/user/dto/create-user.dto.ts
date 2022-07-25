import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: `用户名不能为空` })
  @IsString({ message: `用户名必须是字符串` })
  userName: string;

  @ApiProperty({ description: '用户昵称' })
  @IsString({ message: `用户昵称必须是字符串` })
  realName: string;

  @ApiProperty({ description: '用户密码' })
  @IsString({ message: `用户密码必须是字符串` })
  password: string;

}
