import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Authenticate } from './entities/authenticate.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from './entities/types';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticateService {
  constructor(
    @InjectModel(Authenticate.name)
    private readonly authenticateModel: Model<Authenticate>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(user: any) {
    const jwtPayload = {
      id: user._id,
      email: user.email,
    };

    const [token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '60m',
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { token, refresh_token };
  }

  async signupUser(signupDto: SignUpDto): Promise<TokenType> {
    const { name, email, password } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authenticateModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return await this.generateToken(user);
  }

  async loginUser(loginDto: LoginDto): Promise<TokenType> {
    const { email, password } = loginDto;
    const user = await this.authenticateModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const res = await this.generateToken(user);
    return {
      token: res['token'],
      refresh_token: res['refresh_token'],
    };
  }

  async getAllUsers(query: any): Promise<Authenticate[]> {
    return await this.authenticateModel.find().populate(['students', { path: 'inventories' }]);
  }

  async getDetailUser(id: string): Promise<Authenticate> {
    return await this.authenticateModel.findById(id).populate({
      path: 'inventories',
    });
  }
}
