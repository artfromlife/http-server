import { ApiProperty } from '@nestjs/swagger';
import { IsNotIn } from 'class-validator';
export class RefreshTokenDto {

  @ApiProperty({ description: 'token刷新令牌' })
  @IsNotIn([null,undefined,''],{message: 'refreshToken不能为空'})
  refreshToken: string;
}
