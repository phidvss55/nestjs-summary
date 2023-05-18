import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { SubscriptionService } from '../subscription/subscription.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly subscriptionService: SubscriptionService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // const transaction: Transaction = req.transaction

    const user = await this.authService.create(
      // transaction,
      createUserDto,
    );

    console.log(user);

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Request() request) {
    const user = request.user;
    const { access_token } = await this.authService.createToken(request.user);

    return {
      ...user.toJson(),
      access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getUser(@Request() request) {
    const { access_token } = await this.authService.createToken(request.user);

    return {
      ...request.user.toJson(),
      access_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/subscription')
  async cancelSubscription(@Request() request) {
    if (!request.user.subscription) throw new BadRequestException('No active subscriptions for this user');

    await this.subscriptionService.cancelSubscription(request.user.subscription.id);

    return true;
  }
}
