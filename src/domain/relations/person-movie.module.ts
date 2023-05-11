import { Module } from '@nestjs/common';
import { PersonMovieRelationService } from './person-movie.service';

@Module({
  providers: [PersonMovieRelationService],
})
export class PersonMovieRelationModule {}
