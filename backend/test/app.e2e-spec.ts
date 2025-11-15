import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ResponseInterceptor } from '../src/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from '../src/filters/validation-exception.filter';
import { AllExceptionsFilter } from '../src/filters/all-exception.filter';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(
      new AllExceptionsFilter(),
      new ValidationExceptionFilter(),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ping (GET) should return pong wrapped in interceptor', async () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          success: true,
          code: 200,
          message: 'pong',
          data: null,
        });
      });
  });
});
