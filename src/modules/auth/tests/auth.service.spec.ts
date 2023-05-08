import { Test, TestingModule } from '@nestjs/testing';
import User from '../../users/entity/user.entity';
import { decode } from 'jsonwebtoken';
import { AppModule } from '../../../app.module';
import { AuthService } from '../auth.service';
import { Tokens } from '../types/tokens.type';
import { UsersService } from '../../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const user = {
  email: 'test@gmail.com',
  password: 'super-secret-password',
  name: 'Test user',
};

describe('AuthService Testing', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let moduleRef: TestingModule;
  let configService: ConfigService;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: UsersService,
        },
        JwtService,
        ConfigService,
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    jwtService = moduleRef.get(JwtService);
    configService = moduleRef.get(ConfigService);
  });

  describe('AuthService File', () => {
    it('Must be define', async () => {
      expect(authService).toBeDefined();
    });
  });

  describe('signup', () => {
    it('should signup', async () => {
      const tokens = await authService.signupLocal({
        email: user.email,
        password: user.password,
        name: user.name,
      });

      expect(tokens.access_token).toBeTruthy();
      expect(tokens.refresh_token).toBeTruthy();
    });

    it('should throw on duplicate user signup', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signupLocal({
          email: user.email,
          password: user.password,
          name: user.name,
        });
      } catch (error) {
        expect(error.code).toBe('23505');
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('signin', () => {
    it('should throw if no existing user', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signinLocal({
          email: user.email + 'a',
          password: user.password,
        });
      } catch (error) {
        expect(error.status).toBe(404);
      }

      expect(tokens).toBeUndefined();
    });

    it('should login', async () => {
      await authService.signinLocal({
        email: user.email,
        password: user.password,
      });

      const tokens = await authService.signinLocal({
        email: user.email,
        password: user.password,
      });

      expect(tokens.access_token).toBeTruthy();
      expect(tokens.refresh_token).toBeTruthy();
    });

    it('should throw if password incorrect', async () => {
      let tokenNew: Tokens | undefined;
      try {
        tokenNew = await authService.signinLocal({
          email: user.email,
          password: user.password + 'a',
        });
      } catch (error) {
        expect(error.status).toBe(403);
      }

      expect(tokenNew).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('should pass if call to non existent user', async () => {
      try {
        const result = await authService.logout(4);
        expect(result).toBeDefined();
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('should logout', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signinLocal({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        expect(error.status).toBe(404 || 403);
      }

      expect(tokens?.refresh_token).toBeTruthy();
      expect(tokens?.access_token).toBeTruthy();

      // logout
      let tokenLogouts: any;

      const decoded = await jwtService.verify(tokens.access_token);
      tokenLogouts = authService.logout(decoded?.id);

      expect(tokenLogouts?.refresh_token).toBeFalsy();
    });
  });

  describe('refresh', () => {
    it('should throw if no existing user', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens(1, '');
        expect(tokens).toBeUndefined();
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });

    it('should throw error if user logged out', async () => {
      // signin and save refresh token
      const _tokens = await authService.signinLocal({
        email: user.email,
        password: user.password,
      });

      const rt = _tokens.refresh_token;

      // but since we have the rt already, why not just decoding it
      const decoded = await jwtService.verify(rt, {
        secret: configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const userId = Number(decoded?.id);

      // logout the user so the hashedRt is set to null
      await authService.logout(userId);

      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens(userId, rt);
        expect(tokens).toBeUndefined();
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });

    it('should throw error if refresh token incorrect', async () => {
      const _tokens = await authService.signinLocal({
        email: user.email,
        password: user.password,
      });

      const rt = _tokens.refresh_token;

      const decoded = jwtService.verify(rt, {
        secret: configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const userId = Number(decoded?.id);

      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens(userId, rt + 'a');
        expect(tokens).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should refresh tokens', async () => {
      const _tokens = await authService.signinLocal({
        email: user.email,
        password: user.password,
      });

      const at = _tokens.access_token;
      const rt = _tokens.refresh_token;

      const decoded = jwtService.verify(rt, {
        secret: configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const userId = Number(decoded?.id);

      // since jwt uses seconds signature we need to wait for 1 second to have new jwts
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      const tokens = await authService.refreshTokens(userId, rt);
      expect(tokens).toBeDefined();

      // refreshed tokens should be different
      expect(tokens.access_token).not.toBe(at);
      expect(tokens.refresh_token).not.toBe(rt);
    });
  });
});
