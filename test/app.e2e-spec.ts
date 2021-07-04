import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { EncryptModule } from '../src/encrypt/encrypt.module';
import { HttpModule, INestApplication } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { IKeyPair } from 'src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let privateKey, publicKey: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule, EncryptModule, HttpModule],
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/api/sign-in (POST)', () => {
    it(' It should return 401 Unauthorized due lack of credentials in body ', () => {
      return request(app.getHttpServer()).post('/api/sign-in').expect(401);
    });

    it(' It should 200 and return generatedKeys', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/sign-in')
        .send({
          email: 'admin@mail.com',
          password:
            '$2b$10$NVZuUn6qxpPtmHkLDHxQzetkKgT4Oopi87KOQJcZFFrOm0LdYtWae',
        });

      expect(result.statusCode).toBe(201);
      expect(result.body).toHaveProperty('authToken');
      token = result.body.authToken;
    });
  });

  describe('/api/generate-key-pair (POST)', () => {
    it('Should return 401 Unauthorized due lack of authentication token ', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/generate-key-pair')
        .expect(401);
    });

    it('Should return pair key', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/generate-key-pair')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(result.statusCode).toBe(201);
      privateKey = (result.body as IKeyPair).privateKey;
      publicKey = (result.body as IKeyPair).publicKey;
      expect(privateKey).not.toEqual('');
      expect(publicKey).not.toEqual('');
    });
  });

  describe('/api/encrypt (POST)', () => {
    it('Should return 401 Unauthorized due lack of authentication token ', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/encrypt')
        .send();

      expect(result.statusCode).toBe(401);
    });

    it('Should return base64 encrypted string', async () => {
      const encryptResult = await request(app.getHttpServer())
        .post('/api/encrypt')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`)
        .send({});
      expect(encryptResult.statusCode).toBe(201);
      expect(encryptResult.body).toHaveProperty('encrypted');
      expect(encryptResult.body.encrypted).not.toBe('');

      const decryptResult = await request(app.getHttpServer())
        .post('/api/decrypt')
        .set('Authorization', `Bearer ${token}`)
        .send({ encrypted: encryptResult.body.encrypted });

      expect(decryptResult.statusCode).toBe(201);
      console.debug(decryptResult.body);
    }, 10000);
  });
});
