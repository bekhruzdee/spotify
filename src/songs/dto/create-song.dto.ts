// src/songs/dto/create-song.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsNotEmpty()
  albumId: number;
}
