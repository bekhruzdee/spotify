// // src/albums/albums.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { artistId, ...albumData } = createAlbumDto;
    const artist = await this.artistsRepository.findOne({
      where: { id: artistId },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id ${artistId} not found`);
    }
    const album = this.albumsRepository.create({ ...albumData, artist });
    return this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({ relations: ['artist'] });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['artist'],
    });
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const { artistId, ...albumData } = updateAlbumDto;
    const album = await this.findOne(id);

    if (artistId) {
      const artist = await this.artistsRepository.findOne({
        where: { id: artistId },
      });
      if (!artist) {
        throw new NotFoundException(`Artist with id ${artistId} not found`);
      }
      album.artist = artist;
    }

    Object.assign(album, albumData);
    return this.albumsRepository.save(album);
  }

  async remove(id: number): Promise<{ message: string }> {
    const album = await this.findOne(id);
    await this.albumsRepository.remove(album);
    return { message: `Album with id ${id} deleted successfully` };
  }
}
