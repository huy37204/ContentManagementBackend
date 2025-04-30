import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client = createClient({ url: process.env.REDIS_URL });

  async onModuleInit() {
    this.client.on('error', (err) => console.error('Redis error:', err));
    await this.client.connect();
    console.log('✅ Redis connected');
  }

  async set(key: string, value: string, ttlInSec?: number) {
    await this.client.set(key, value, {
      EX: ttlInSec,
    });
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string) {
    return await this.client.del(key);
  }
}
