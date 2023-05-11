import { Injectable } from '@nestjs/common';
import { node, relation } from 'cypher-query-builder';
import { Entities, Relations } from 'src/common/schema/graphql';
import { QueryRepository } from 'src/modules/neo4j/query.repository';

@Injectable()
export class UserService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async userGenreMovieCountRec(userName: string, limit: number) {
    const genreAlias = `in${Relations.IN_GENRE}`;
    const movieCount = 'movieCount';
    const result = await this.queryRepository
      .initQuery()
      .match([
        node(Entities.User, Entities.User, { name: userName }),
        relation('out', '', Relations.RATED),
        node(Entities.Movie, Entities.Movie),
        relation('out', genreAlias, Relations.IN_GENRE),
        node(Entities.Genre, Entities.Genre),
      ])
      .return(`${Entities.Genre}.name as genreName, count(${genreAlias}) as ${movieCount}`)
      .orderBy(`${movieCount}`, 'DESC')
      .limit(limit)
      .run();

    return result;
  }
}
