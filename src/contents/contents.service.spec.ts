import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from './contents.service';
import { getModelToken } from '@nestjs/mongoose';
import { ContentsGateway } from './contents.gateway';

describe('ContentsService', () => {
  let service: ContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentsService,
        {
          provide: getModelToken('Content'),
          useValue: {}, // hoặc mock bằng jest.fn()
        },
        {
          provide: ContentsGateway,
          useValue: {}, // nếu có phương thức cần mock, dùng jest.fn()
        },
      ],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
