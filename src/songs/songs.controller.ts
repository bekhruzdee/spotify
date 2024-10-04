// src/songs/songs.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { SongsService } from './songs.service';
  import { CreateSongDto } from './dto/create-song.dto';
  import { UpdateSongDto } from './dto/update-song.dto';
  import { Song } from './entities/song.entity';
  
  @Controller('songs')
  export class SongsController {
    constructor(private readonly songsService: SongsService) {}
  
    @Post()
    create(@Body() createSongDto: CreateSongDto): Promise<Song> {
      return this.songsService.create(createSongDto);
    }
  
    @Get()
    findAll(): Promise<Song[]> {
      return this.songsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Song> {
      return this.songsService.findOne(Number(id));
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto): Promise<Song> {
      return this.songsService.update(+id, updateSongDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<{ message: string }> {
      return this.songsService.remove(Number(id));
    }
  }
  