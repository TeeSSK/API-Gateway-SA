import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UserDetails } from './interface/user-principle.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new ForbiddenException('Access Denied');
    const email = user.email;
    const displayName = user.displayName;
    return { email, displayName };
  }

  async login(user: UserDetails) {
    console.log('login');
    let userExists = await this.usersService.findByEmail(user.email);
    if (!userExists) {
      userExists = await this.usersService.create({ ...user, isAdmin: false });
    }
    const tokens = await this.getTokens(
      userExists._id,
      userExists.email,
      userExists.isAdmin,
    );
    await this.updateRefreshToken(userExists._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    console.log('refreshTokens', refreshTokenMatches);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.isAdmin);
    console.log('renew', tokens);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async signAdminRole(userId: string) {
    await this.usersService.update(userId, { isAdmin: true });
    return { msg: 'Admin role assigned' };
  }

  async unSignAdminRole(userId: string) {
    await this.usersService.update(userId, { isAdmin: false });
    return { msg: 'Admin role unassigned' };
  }

  // TODO: add user role
  async getTokens(id: string, email: string, isAdmin: boolean) {
    const payload = { id, email, isAdmin };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '180m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '3d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
