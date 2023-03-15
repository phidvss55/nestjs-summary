import { ParseUUIDPipe } from "@nestjs/common";

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
}
