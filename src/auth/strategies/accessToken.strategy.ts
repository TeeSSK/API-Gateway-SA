import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UserDetails } from '../interface/user-principle.interface';
import jwtSecretConfig from '../../config/jwt.config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtSecretConfig.KEY) config: ConfigType<typeof jwtSecretConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.accessTokenSecret,
    });
  }

  async validate(payload: UserDetails) {
    console.log('AccessTokenStrategy');
    console.log(payload);
    return payload;
  }
}
