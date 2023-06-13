import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Neo4jService } from '../neo4j/neo4j.service';
import { types } from 'neo4j-driver';
import { User } from '../user/entities/user.entity';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Subscription } from '../subscription/entities/subscription.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly neo4jService: Neo4jService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    // databaseOrTransaction: string | Transaction,
    { email, password, dob, firstname, lastname }: CreateUserDto,
  ): Promise<User> {
    const dayOfBirth = new Date(dob);
    const res = await this.neo4jService.write(
      `
        CREATE (u:User)
        SET u += $properties, u.id = randomUUID()
        RETURN u
      `,
      {
        properties: {
          email,
          password: await this.encryptionService.hash(password),
          dob: types.Date.fromStandardDate(dayOfBirth),
          firstname,
          lastname,
        },
      },
    );

    return this.hydrate(res);
  }

  private hydrate(res): User {
    if (!res.records.length) {
      return undefined;
    }

    const user = res.records[0].get('u');
    // const subscription = res.records[0].get('subscription');

    // return new User(user, subscription ? new Subscription(subscription.subscription, subscription.plan) : undefined);
    return new User(user, undefined);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user !== undefined && (await this.encryptionService.compare(password, user.getPassword()))) {
      return user;
    }

    return null;
  }

  async createToken(user: User) {
    const { id, email, dateOfBirth, firstName, lastName } = user.toJson();

    // Encode that into a JWT
    return {
      access_token: this.jwtService.sign({
        sub: id,
        email,
        dateOfBirth,
        firstName,
        lastName,
      }),
    };
  }
}
