import { Controller, Get, UseGuards, Inject, Req, Res } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-oauth.guard';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserDetails } from './interface/user-principle.interface';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    console.log('googleLogin');
    return 'Logged In';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async handleRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('handleRedirect');
    if (!req.user) {
      return 'No user from google';
    }
    const user = req.user as UserDetails;
    const cookieDomain = process.env.DOMAIN;
    const frontendURL = process.env.FRONTEND_URL;
    console.log(user);
    const token = await this.authService.login(user);
    console.log(token);
    res.cookie('refreshToken', token.refreshToken, {
      sameSite: 'none',
      secure: true,
      path: '/',
      domain: cookieDomain,
    });
    res.cookie('accessToken', token.accessToken, {
      sameSite: 'none',
      secure: true,
      path: '/',
      domain: cookieDomain,
    });
    res.redirect(frontendURL);
  }

  @UseGuards(AccessTokenGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    console.log(req.user);
    const id = req.user['id'];
    return this.authService.getMe(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    console.log('logout', req.user);
    await this.authService.logout(req.user['id']);
    return { msg: 'Logged out' };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refreshToken')
  refreshTokens(@Req() req: Request) {
    console.log(req.user);
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
