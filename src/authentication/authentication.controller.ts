import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/RegisterDto.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './interface/requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import JwtRefreshToken from './jwt-refresh.guard';
import { UserService } from '../user/user.service';

@Controller('authentication')
@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.authenticationService.register(registerData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  // async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(user.id);
    const { cookie: refreshTokenCookie, token: refreshToken } = this.authenticationService.getCookieWithJwtRefreshToken(
      user.id,
    );

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return user;

    // request.res.setHeader('Set-Cookie', cookie);
    // request.res.setHeader('Content-Type', 'text/html');
    // user.password = undefined;
    // return response.send(user);
    // return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogout());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshToken)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtAccessToken(request.user?.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
