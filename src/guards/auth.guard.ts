import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenService } from '../token/token.service';
const whiteList = ['/nest/user/login', '/nest/user/tokenRefresh']
const tokenService = new TokenService()
@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request | any>();
    const { url } = request
    if(whiteList.includes(url)) return true
    const token: string = request.header('authorization');
    if(token){
      try {
        const user = tokenService.validateAccessToken(token.split(' ')[1])
        if(user) {
          request.user = user
          return true
        } else return false
      }catch (e) {
        return false
      }
    }
    return false;
  }
}
