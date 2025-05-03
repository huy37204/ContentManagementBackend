import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { S3Service } from 'src/common/services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('contents')
export class ContentsController {
  constructor(
    private readonly contentsService: ContentsService,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  create(@Body() dto: CreateContentDto) {
    return this.contentsService.create(dto);
  }

  @Get('publish')
  findAllPublish() {
    return this.contentsService.findAllPublish();
  }

  @Get()
  findAll() {
    return this.contentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateContentDto>) {
    return this.contentsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.contentsService.delete(id);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateContentDto,
    @Req() req,
  ) {
    const url = await this.s3Service.uploadFile(file);
    const mimeType = file.mimetype;

    let type: 'image' | 'video' | 'text' = 'image';

    if (mimeType.startsWith('video/')) type = 'video';
    else if (mimeType.startsWith('image/')) type = 'image';
    else throw new Error('Unsupported file type');

    return this.contentsService.create({
      ...body,
      blocks: [{ type, url }],
      createdBy: req.user.userId,
      updatedBy: req.user.userId,
    });
  }
}
