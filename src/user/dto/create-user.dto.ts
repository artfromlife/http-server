import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @ApiProperty({
    description: '姓'
  })
  @IsNotEmpty({
    message: `firstName 不能为空`
  })
  @IsString({
    message: `firstName 必须是字符串`
  })
  firstName: string;

  @ApiProperty({
    description: '名'
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;


  @ApiProperty({
    description: '是否启用'
  })
  isActive: boolean;
}
