import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayload } from '../../modules/auth/types/jwtPayload.type';

export const GetCurrrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest();
  console.log('request', request.user);
  const user = request.user as JwtPayload;

  return user.id;
});
