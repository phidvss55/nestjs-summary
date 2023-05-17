import { EncryptionModule } from './../encryption/encryption.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, jwtstra],
  imports: [UserModule, EncryptionModule],
})
export class AuthModule {}
