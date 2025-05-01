import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { Content, ContentSchema } from './schemas/content.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsGateway } from './contents.gateway';
import { S3Service } from 'src/common/services/s3.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  controllers: [ContentsController],
  providers: [ContentsService, ContentsGateway, S3Service],
  exports: [ContentsService],
})
export class ContentsModule {}
