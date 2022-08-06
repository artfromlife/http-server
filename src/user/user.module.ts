import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TokenService } from '../token/token.service';

@Module({
  imports: [ TypeOrmModule.forFeature([User]) ],
  controllers: [UserController],
  providers: [UserService, Logger, TokenService]
})
export class UserModule {}
