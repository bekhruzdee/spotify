// src/playlists/dto/create-playlist.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreatePlaylistDto {
  @IsNotEmpty()
  title: string;

  userId: number;
}
