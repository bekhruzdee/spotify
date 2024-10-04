import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist_song.dto';

@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}

  @Post()
  create(@Body() createPlaylistSongDto: CreatePlaylistSongDto) {
    return this.playlistSongsService.create(createPlaylistSongDto);
  }

  @Get()
  findAll() {
    return this.playlistSongsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistSongsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistSongDto: UpdatePlaylistSongDto) {
    return this.playlistSongsService.update(+id, updatePlaylistSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistSongsService.remove(+id);
  }
}
