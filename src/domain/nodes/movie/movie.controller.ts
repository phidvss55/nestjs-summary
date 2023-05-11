import { Injectable, Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('rating-count')
  async movieRatingCountRec(@Query() query: any, limit = 10) {
    return await this.movieService.movieRatingCountRec(query?.movieName, limit);
  }
}
