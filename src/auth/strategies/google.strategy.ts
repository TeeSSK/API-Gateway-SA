import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import googleOauthConfig from '../../config/google-oauth.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY) config: ConfigType<typeof googleOauthConfig>,
  ) {
    super({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL:
        config.callbackURL || 'http://localhost:3001/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('GoogleStrategy');
    console.log(accessToken, refreshToken, profile);
    const email = profile?.emails[0].value;
    const displayName = profile?.displayName;
    const user = { email, displayName };

    return user;
  }
}
