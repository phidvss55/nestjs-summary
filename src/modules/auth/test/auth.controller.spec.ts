import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockupUser: CreateUserDto = {
    email: 'hello@gmail.com',
    password: '12345678',
    dob: new Date('2019-01-31'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('Auth', () => {
    describe('POST /auth/register', () => {
      it('should validate the request', async () => {
        const res = await controller.register(mockupUser);

        console.log('res', res);
        // expect(res.statusCode).toBe(400);
      });
    });
  });
});
