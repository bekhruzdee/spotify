import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/entities/user.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { ArtistsModule } from 'src/artists/artists.module';
import { Album } from 'src/albums/entities/album.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { Song } from 'src/songs/entities/song.entity';
import { SongsModule } from 'src/songs/songs.module';
import { Playlist } from 'src/playlists/entities/playlist.entity';
import { PlaylistsModule } from 'src/playlists/playlists.module';


@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2512',
      database: 'spotify',
      entities: [User, Artist, Album, Song, Playlist],
      synchronize: true,
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    SongsModule,
    PlaylistsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
