import { IsNotIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UserLoginDto {

  @ApiProperty({ description: '用户名' })
  @IsNotIn([null,undefined,''],{message: '用户名不能为空'})
  userName: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotIn([null,undefined,''],{message: '用户密码不能为空'})
  password: string;

}
