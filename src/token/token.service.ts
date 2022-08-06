import { Injectable } from '@nestjs/common';
import jwt = require('jsonwebtoken');

type Payload = {
  userId: string,
  userName: string,
  isAdmin: boolean
}
const ACCESS_TOKEN = {
  SECRET: `ACCESS_TOKEN`,
  EXPIRES_IN: 60 * 60, // 单位是秒
};
const REFRESH_TOKEN = {
  SECRET: `REFRESH_TOKEN`,
  EXPIRES_IN: 60 * 60 * 24 * 7, // 单位是秒
};

@Injectable()
export class TokenService {

  genTokens(payload: Payload) {
    return {
      userId: payload.userId,
      userName: payload.userName,
      accessToken: this.genAccessToken(payload),
      accessTokenExpiresIn: ACCESS_TOKEN.EXPIRES_IN,
      refreshToken: this.genRefreshToken(payload),
      refreshTokenExpiresIn: REFRESH_TOKEN.EXPIRES_IN,
    };
  }

  genAccessToken(payload: Payload) {
    return jwt.sign(payload, ACCESS_TOKEN.SECRET, { expiresIn: ACCESS_TOKEN.EXPIRES_IN });
  }

  genRefreshToken(payload: Payload) {
    return jwt.sign(payload, REFRESH_TOKEN.SECRET, { expiresIn: REFRESH_TOKEN.EXPIRES_IN });
  }

  validateAccessToken(accessToken: string) {
    let payload
    try{
      payload = jwt.verify(accessToken, ACCESS_TOKEN.SECRET);
    }catch (e) {
      payload = false
    }
    return payload
  }
  validateRefreshToken(refreshToken: string) {
    try{
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN.SECRET);
      return payload
    }catch (e) {
      return false
    }
  }
}
