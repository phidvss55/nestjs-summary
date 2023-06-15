import { Controller, Get, Query, Param, Delete, Put, Post, Body } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiTags } from '@nestjs/swagger';
import { PersonInput } from 'src/common/schema/graphql';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':id')
  async getPerson(@Param('id') id: number) {
    return await this.personService.getPerson(id);
  }

  @Post()
  async createPerson(@Body() data: PersonInput): Promise<any> {
    return await this.personService.createPerson(data);
  }

  @Delete(':id')
  async deletePerson(@Param('id') id: number): Promise<boolean> {
    return await this.personService.deletePerson(id);
  }

  @Put(':id')
  async updatePerson(@Param('id') id: number, @Body() data: PersonInput): Promise<any> {
    return await this.personService.updatePerson(id, data);
  }
}
