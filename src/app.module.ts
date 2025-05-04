import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContentsModule } from './contents/contents.module';
import { ConfigModule } from '@nestjs/config';
import { UploadController } from './common/controllers/upload.controller';
import { S3Service } from './common/services/s3.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
