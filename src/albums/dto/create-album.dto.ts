// src/albums/dto/create-album.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  artistId: number;

  @IsOptional()
  release_date?: Date;
}
