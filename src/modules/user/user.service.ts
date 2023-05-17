import { Neo4jService } from './../neo4j/neo4j.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Subscription } from '../subscription/entities/subscription.entity';

@Injectable()
export class UserService {
  constructor(private readonly neo4jService: Neo4jService) {}

  private hydrate(res): User {
    if (!res.records.length) {
      return undefined;
    }

    const user = res.records[0].get('u');
    const subscription = res.records[0].get('subscription');

    return new User(user, subscription ? new Subscription(subscription.subscription, subscription.plan) : undefined);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    const res = await this.neo4jService.read(
      `
      MATCH (u:User { email: $email })
      RETURN u
    `,
      { email },
    );

    return this.hydrate(res);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
