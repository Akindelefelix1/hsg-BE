import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, Matches } from 'class-validator';
export class UploadRequestDto {
  @ApiProperty({ example: 'seven-star/navy-wool.webp' })
  @IsString()
  @Matches(/^(?!\/)(?!.*(?:^|\/)\.\.?($|\/))[a-zA-Z0-9][a-zA-Z0-9/_\-.]*$/)
  key!: string;

  @ApiProperty({ example: 'image/webp' })
  @IsIn(['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'])
  contentType!: string;
}
