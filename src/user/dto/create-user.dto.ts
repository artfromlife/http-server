import { IsEmpty, IsNotIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

  @ApiProperty({ description: '真实姓名', required: false })
  realName?: string;

  @ApiProperty({ description: '用户名' })
  @IsNotIn([null,undefined,''],{message: '用户名不能为空'})
  userName: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotIn([null,undefined,''],{message: '用户密码不能为空'})
  password: string;

  // @ApiProperty({ readOnly: true }) // 在 swagger 文档中就看不到此字段了
  // creator: string;
}
