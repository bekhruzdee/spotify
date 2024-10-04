import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(
    createArtistDto: CreateArtistDto,
  ): Promise<{ message: string; artist: Artist }> {
    const artist = this.artistRepository.create(createArtistDto);
    await this.artistRepository.save(artist);
    return {
      message: `Artist created successfully`,
      artist,
    };
  }

  findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: number) {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async update(
    id: number,
    updateArtistDto: UpdateArtistDto,
  ): Promise<{ message: string; artist: Artist }> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    await this.artistRepository.update(id, updateArtistDto);
    const updatedArtist = await this.artistRepository.findOne({
      where: { id },
    });
    return {
      message: `Artist with ID ${id} updated successfully`,
      artist: updatedArtist,
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    await this.artistRepository.delete(id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
