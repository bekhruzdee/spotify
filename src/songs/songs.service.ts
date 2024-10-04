// src/songs/songs.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  // CREATE
  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { albumId, ...songData } = createSongDto;
    const album = await this.albumsRepository.findOne({ where: { id: albumId } });

    if (!album) {
      throw new NotFoundException(`Album with id ${albumId} not found`);
    }

    const song = this.songsRepository.create({ ...songData, album });
    return this.songsRepository.save(song);
  }

  // FIND ALL
  async findAll(): Promise<Song[]> {
    return this.songsRepository.find({ relations: ['album'] });
  }

  // FIND ONE
  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOne({
      where: { id },
      relations: ['album'],
    });

    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }

    return song;
  }

  // UPDATE
  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const { albumId, ...songData } = updateSongDto;
    const song = await this.findOne(id);

    if (albumId) {
      const album = await this.albumsRepository.findOne({ where: { id: albumId } });

      if (!album) {
        throw new NotFoundException(`Album with id ${albumId} not found`);
      }

      song.album = album;
    }

    Object.assign(song, songData);
    return this.songsRepository.save(song);
  }

  // DELETE
  async remove(id: number): Promise<{ message: string }> {
    const song = await this.findOne(id);
    await this.songsRepository.remove(song);
    return { message: `Song with id ${id} deleted successfully` };
  }
}
