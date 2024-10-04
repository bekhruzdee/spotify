import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateArtistDto {
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  bio?: string;
}
