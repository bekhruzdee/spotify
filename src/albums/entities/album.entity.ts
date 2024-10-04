// src/albums/entities/album.entity.ts
import { Artist } from 'src/artists/entities/artist.entity';
import { Song } from 'src/songs/entities/song.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Albums')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: `CASCADE`,
    nullable: false,
  })
  @JoinColumn({ name: `artist_id` })
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];

  @Column({ type: 'date', nullable: true })
  release_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
