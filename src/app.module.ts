import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentsModule } from './contents/contents.module';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './common/controllers/upload.controller';
import { S3Service } from './common/services/s3.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    UsersModule,
    ContentsModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, S3Service],
})
export class AppModule {}
