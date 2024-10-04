// src/albums/dto/update-album.dto.ts
import { IsOptional } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  artistId?: number;

  @IsOptional()
  release_date?: Date;
}
