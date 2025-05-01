import { IsIn, IsOptional, IsString } from 'class-validator';
import { IBlock } from '../interfaces/block.interface';

export class BlockDto implements IBlock {
  @IsIn(['text', 'image', 'video'])
  type: 'text' | 'image' | 'video';

  @IsOptional()
  @IsString()
  heading?: string;

  @IsOptional()
  @IsString()
  paragraph?: string;

  @IsString()
  url?: string;
}
