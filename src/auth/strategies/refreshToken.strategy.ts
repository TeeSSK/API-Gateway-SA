import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserDetails } from '../interface/user-principle.interface';
import jwtSecretConfig from '../../config/jwt.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtSecretConfig.KEY) config: ConfigType<typeof jwtSecretConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserDetails) {
    console.log('RefreshTokenStrategy');
    console.log(payload);
    console.log(req.get('Authorization'));
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { ...payload, refreshToken };
  }
}
