import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException, Injectable } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UserService, private readonly jwtService: JwtService) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const user = await this.UserService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id,
      }),
    };
  }
}
