import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class EncryptionService {
  constructor(private readonly configService: ConfigService) {}

  async hash(plain: string): Promise<string> {
    return hash(plain, 10);
  }

  async compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted);
  }
}
