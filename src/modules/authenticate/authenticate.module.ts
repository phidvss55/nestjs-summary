import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthenticateService } from './authenticate.service';
import { AuthenticateController } from './authenticate.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticateSchema } from './entities/authenticate.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Authenticate', schema: AuthenticateSchema }]),
  ],
  controllers: [AuthenticateController],
  providers: [AuthenticateService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticateModule {}
