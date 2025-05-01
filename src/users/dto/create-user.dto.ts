import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  isString,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;

  @IsEnum(['admin', 'editor', 'client'])
  role: 'admin' | 'editor' | 'client';
}
