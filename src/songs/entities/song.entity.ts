// src/songs/entities/song.entity.ts
import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true })
  duration: number;

  @ManyToOne(() => Album, (album) => album.songs, { onDelete: 'CASCADE' })
  album: Album;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}