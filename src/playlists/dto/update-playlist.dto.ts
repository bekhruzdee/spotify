// src/playlists/dto/update-playlist.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePlaylistDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  userId?: number;
}
