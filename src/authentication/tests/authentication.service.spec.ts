import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthenticationService } from '../authentication.service';
import mockedConfigService from '../../utils/mocks/config.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import User from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

describe('The AuthenticateServicesTest', () => {
  let authenticateService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authenticateService = await module.get(AuthenticationService);
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      const res = authenticateService.getCookieWithJwtToken(userId);

      expect(typeof res).toEqual('string');
    });
  });
});
