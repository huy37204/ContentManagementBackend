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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateContentDto, @Req() req) {
    return this.contentsService.create({
      ...dto,
      status: 'draft',
      createdBy: req.user.userId,
      updatedBy: req.user.userId,
    });
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

  @Get(':id/publish')
  findOnePublish(@Param('id') id: string) {
    return this.contentsService.findOnePublish(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: Partial<UpdateContentDto>,
    @Req() req,
  ) {
    const updateDto = {
      ...dto,
      status: 'draft' as 'draft',
      updatedBy: req.user.userId,
    };
    return this.contentsService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.contentsService.delete(id);
  }

  // @Post('upload')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async upload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() body: CreateContentDto,
  //   @Req() req,
  // ) {
  //   const url = await this.s3Service.uploadFile(file);
  //   const mimeType = file.mimetype;

  //   let type: 'image' | 'video' | 'text' = 'image';

  //   if (mimeType.startsWith('video/')) type = 'video';
  //   else if (mimeType.startsWith('image/')) type = 'image';
  //   else throw new Error('Unsupported file type');

  //   return this.contentsService.create({
  //     ...body,
  //     blocks: [{ type, url }],
  //     createdBy: req.user.userId,
  //     updatedBy: req.user.userId,
  //   });
  // }

  @Patch(':id/publish')
  @UseGuards(JwtAuthGuard)
  async publishContent(@Param('id') id: string, @Req() req) {
    return this.contentsService.updateStatus(id, 'published', req.user.id);
  }
}
