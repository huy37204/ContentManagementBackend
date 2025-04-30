import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class BlockDto {
  @IsString()
  type: 'text' | 'image' | 'video';

  @IsString()
  data?: string;

  @IsString()
  url?: string;
}

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BlockDto)
  block: BlockDto[];
}
