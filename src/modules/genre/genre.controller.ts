import { Controller, Get, ParseIntPipe, Request, Param, Query, DefaultValuePipe, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getList(@Request() request) {
    return this.genreService.getGenresForuser(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getGenre(@Request() request, @Param('id', new ParseIntPipe()) id: number) {
    return this.genreService.getGenreDetails(request.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/movies')
  async getMovies(
    @Request() request,
    @Param('id', new ParseIntPipe()) id: number,
    @Query('orderBy', new DefaultValuePipe('title')) orderBy: string,
    @Query('page', new DefaultValuePipe('1'), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe('10'), ParseIntPipe) limit: number,
  ) {
    return this.genreService.getMoviesForGenre(request.user, id, orderBy, limit, page);
  }
}
