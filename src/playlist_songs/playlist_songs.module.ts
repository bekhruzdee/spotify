import { Module } from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { PlaylistSongsController } from './playlist_songs.controller';

@Module({
  controllers: [PlaylistSongsController],
  providers: [PlaylistSongsService],
})
export class PlaylistSongsModule {}
