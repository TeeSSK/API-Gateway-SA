import { registerAs } from '@nestjs/config';

export default registerAs('jwt-secret', () => ({
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
}));
