import { ApiProperty } from '@nestjs/swagger';

export type JwtPayload = {
  id: number;
  email: string;
};

export class JwtPayloadClass implements JwtPayload {
  @ApiProperty({
    name: 'id',
  })
  id: number;

  @ApiProperty({
    name: 'email',
  })
  email: string;
}
