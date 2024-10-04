// src/albums/albums.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { Song } from 'src/songs/entities/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Song]), ArtistsModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
