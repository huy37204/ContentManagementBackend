import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RedisService } from 'src/common/services/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true, // cần để lấy request trong validate()
    });
  }

  async validate(req: Request, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    // Kiểm tra token trong Redis (ví dụ lưu dưới key: token:<userId>)
    const cachedToken = await this.redisService.get(`token:${payload.sub}`);
    if (!cachedToken || cachedToken !== token) {
      throw new UnauthorizedException('Token is revoked or invalid');
    }

    return { userId: payload.sub, role: payload.role }; // inject vào req.user
  }
}
