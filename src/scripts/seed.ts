import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

async function hash(password: string) {
  return bcrypt.hash(password, 10);
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userService = app.get(UsersService);

  const users: CreateUserDto[] = [
    {
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      email: 'editor@example.com',
      password: 'editor123',
      role: 'editor',
    },
    {
      email: 'client@example.com',
      password: 'client123',
      role: 'client',
    },
  ];

  for (const user of users) {
    const exists = await userService.findByEmail(user.email);
    if (!exists) {
      await userService.create(user);
      console.log(`✅ Created user: ${user.email}`);
    } else {
      console.log(`⚠️  User already exists: ${user.email}`);
    }
  }

  await app.close();
}
bootstrap();
