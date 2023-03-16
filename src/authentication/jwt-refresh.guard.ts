import { AuthGuard } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';

@Injectable()
export default class JwtRefreshToken extends AuthGuard('jwt-refresh-token') {}