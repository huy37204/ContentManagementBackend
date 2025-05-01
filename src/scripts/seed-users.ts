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
      name: 'admin',
      role: 'admin',
    },
    {
      email: 'admin1@example.com',
      password: 'admin123',
      name: 'admin1',
      role: 'admin',
    },
    {
      email: 'admin2@example.com',
      password: 'admin123',
      name: 'admin2',
      role: 'admin',
    },
    {
      email: 'admin3@example.com',
      password: 'admin123',
      name: 'admin3',
      role: 'admin',
    },
    {
      email: 'editor@example.com',
      password: 'editor123',
      name: 'editor',
      role: 'editor',
    },
    {
      email: 'client@example.com',
      password: 'client123',
      name: 'client',
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
  process.exit(0);
}
bootstrap();
