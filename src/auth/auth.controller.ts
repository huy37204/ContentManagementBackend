import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RedisService } from 'src/common/services/redis.service';
import { User } from 'src/users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private authService: AuthService,
    private redisService: RedisService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req) {
    const userId = req.user.userId;
    const user = await this.userModel
      .findById(userId)
      .select('-password')
      .exec();
    return user;
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
