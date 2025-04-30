import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RedisService } from 'src/common/services/redis.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private redisService: RedisService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@Req() req) {
    return req.user;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const { userId } = req.user;
    await this.redisService.del(`token:${userId}`);
    return { message: 'Logged out successfully' };
  }
}
