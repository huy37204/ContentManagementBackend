import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/common/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid password');

    const { password: _, ...result } = user;
    return user;
  }

  async login(user: any) {
    const payload = { sub: user._id, role: user.role };
    const token = this.jwtService.sign(payload);
    await this.redisService.set(`token:${user._id}`, token, 3600);
    return {
      access_token: token,
    };
  }
}
