import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BlockDto } from './block.dto';

export class UpdateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  blocks?: BlockDto[];

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: string;
}
