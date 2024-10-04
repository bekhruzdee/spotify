// src/songs/dto/update-song.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  title?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  albumId?: number;
}
