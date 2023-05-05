import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Roles } from 'src/common/constants/roles.constants';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const { id } = request.user;
      const user = await this.userService.getById(id);

      return user.role === Roles.ADMIN;
    }

    return false;
  }
}
