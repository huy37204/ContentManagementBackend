import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { S3Service } from 'src/common/services/s3.service';

describe('ContentsController', () => {
  let controller: ContentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [
        {
          provide: ContentsService,
          useValue: {}, // hoặc jest.fn() nếu cần
        },
        {
          provide: S3Service,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ContentsController>(ContentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
