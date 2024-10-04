// src/playlists/entities/playlist.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // Foydalanuvchilar jadvali

@Entity('Playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => User, (user) => user.playlists)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

