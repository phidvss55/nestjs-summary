import { SetMetadata } from '@nestjs/common';

export const Public = (...roles: string[]) => SetMetadata('roles', roles);
