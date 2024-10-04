// src/playlists/playlists.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { Playlist } from './entities/playlist.entity';
import { User } from 'src/users/entities/user.entity'; // Foydalanuvchilar entitisi

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
