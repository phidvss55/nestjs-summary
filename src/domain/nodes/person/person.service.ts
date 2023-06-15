import { QueryRepository } from './../../../modules/neo4j/query.repository';
import { Injectable } from '@nestjs/common';
import { Entities, Person, PersonInput } from '../../../common/schema/graphql';
import { node } from 'cypher-query-builder';

@Injectable()
export class PersonService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async getPerson(id: number): Promise<any> {
    const query = await this.queryRepository
      .initQuery()
      .match([node(Entities.Person, Entities.Person)])
      .where({
        [`ID(${Entities.Person})`]: Number(id),
      })
      .return(Entities.Person)
      .run();

    if (query?.length > 0) {
      const {
        [Entities.Person]: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async createPerson(personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;
    const query = await this.queryRepository
      .initQuery()
      .createNode(Entities.Person, Entities.Person, { name, age })
      .return(Entities.Person)
      .run();

    if (query?.length > 0) {
      const {
        [Entities.Person]: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }

  async deletePerson(id: number): Promise<boolean> {
    await this.queryRepository
      .initQuery()
      .match([node(Entities.Person, Entities.Person)])
      .where({
        [`ID(${Entities.Person})`]: Number(id),
      })
      .delete(Entities.Person)
      .run();

    return true;
  }

  async updatePerson(id: number, personInput: PersonInput): Promise<Person> {
    const { name, age } = personInput;

    let updateObject = {};
    if (name) {
      updateObject = {
        [`${Entities.Person}.name`]: name,
      };
    }

    if (age) {
      updateObject = {
        ...updateObject,
        [`${Entities.Person}.age`]: age,
      };
    }

    const query = await this.queryRepository
      .initQuery()
      .match([node(Entities.Person, Entities.Person)])
      .where({
        [`ID(${Entities.Person})`]: Number(id),
      })
      .setValues(updateObject)
      .return(Entities.Person)
      .run();

    if (query?.length > 0) {
      const {
        [Entities.Person]: { identity, properties },
      } = query[0];
      return {
        id: identity,
        ...properties,
      };
    }
  }
}
