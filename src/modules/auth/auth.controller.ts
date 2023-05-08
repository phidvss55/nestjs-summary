import { JwtPayload, JwtPayloadClass } from '../../modules/auth/types/jwtPayload.type';
import { GetCurrrentUser } from './../../common/decorators/getCurrentUser.decorator';
import { GetCurrrentUserId } from './../../common/decorators/getCurrentUserId.decorator';
import { Controller, Req, Post, Body, UseGuards, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { AuthDto } from './dto/auth.dto';
import { Tokens, TokensSchema } from './types/tokens.type';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { JwtRefreshAuthGuard } from './guards/jwtAuthRefresh.guard';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Return to token',
    type: TokensSchema,
  })
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post('signup')
  @ApiResponse({
    description: 'Return to token',
    type: TokensSchema,
  })
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() data: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(data);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Get profile of loggedin user',
    type: JwtPayloadClass,
  })
  async profile(@Req() req: Request) {
    return {
      data: req.user,
    };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiResponse({
    description: 'Return to token',
    type: TokensSchema,
  })
  refreshTokens(@GetCurrrentUserId() id: number, @GetCurrrentUser('refreshToken') token: string) {
    // const user = req.user;
    return this.authService.refreshTokens(id, token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        ok: {
          type: 'boolean',
        },
      },
    },
  })
  logout(@GetCurrrentUserId() id: number) {
    // const user = req.user;
    return this.authService.logout(id);
  }
}
