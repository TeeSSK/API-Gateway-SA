import { registerAs } from '@nestjs/config';

export default registerAs('google-oauth', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GATEWAY_URL + '/api/auth/google/redirect',
}));
