import { Controller, Get, UseGuards, Inject, Req } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UserDetails } from './interface/user-principle.interface';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req: Request) {
    console.log('handleRedirect');
    if (!req.user) {
      return 'No user from google';
    }
    const user = req.user as UserDetails;
    console.log(user);
    return this.authService.login(user);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    console.log(req);
    return req.user;
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    console.log(req);
    // this.authService.logout(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    console.log(req.user);
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
