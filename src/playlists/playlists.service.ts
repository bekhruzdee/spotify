// src/playlists/playlists.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepository: Repository<Playlist>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const { userId, ...playlistData } = createPlaylistDto;
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const playlist = this.playlistsRepository.create({ ...playlistData, user });
    return this.playlistsRepository.save(playlist);
  }

  async findAll(): Promise<Playlist[]> {
    return this.playlistsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Playlist> {
    const playlist = await this.playlistsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!playlist) {
      throw new NotFoundException(`Playlist with id ${id} not found`);
    }
    return playlist;
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    const { userId, ...playlistData } = updatePlaylistDto;
    const playlist = await this.findOne(id);

    if (userId) {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      playlist.user = user;
    }

    Object.assign(playlist, playlistData);
    return this.playlistsRepository.save(playlist);
  }

  async remove(id: number): Promise<{ message: string }> {
    const playlist = await this.findOne(id);
    await this.playlistsRepository.remove(playlist);
    return { message: `Playlist with id ${id} deleted successfully` };
  }
}
