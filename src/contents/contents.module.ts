import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { Content, ContentSchema } from './schemas/content.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentsGateway } from './contents.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }]),
  ],
  controllers: [ContentsController],
  providers: [ContentsService, ContentsGateway],
  exports: [ContentsService],
})
export class ContentsModule {}
