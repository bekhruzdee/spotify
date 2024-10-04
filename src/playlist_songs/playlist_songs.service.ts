import { Injectable } from '@nestjs/common';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist_song.dto';

@Injectable()
export class PlaylistSongsService {
  create(createPlaylistSongDto: CreatePlaylistSongDto) {
    return 'This action adds a new playlistSong';
  }

  findAll() {
    return `This action returns all playlistSongs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlistSong`;
  }

  update(id: number, updatePlaylistSongDto: UpdatePlaylistSongDto) {
    return `This action updates a #${id} playlistSong`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlistSong`;
  }
}
