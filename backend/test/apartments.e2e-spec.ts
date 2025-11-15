import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ResponseInterceptor } from '../src/interceptors/response.interceptor';
import { ValidationExceptionFilter } from '../src/filters/validation-exception.filter';
import { AllExceptionsFilter } from '../src/filters/all-exception.filter';
import { isUUID } from 'class-validator';

describe('Apartments Module (Authorization e2e)', () => {
  let app: INestApplication;
  let firstApartmentId: string;

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
        transformOptions: { enableImplicitConversion: true },
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

  describe('GET /apartments', () => {
    it('should return 401 if no bearer token is provided', () => {
      return request(app.getHttpServer())
        .get('/apartments')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({
            success: false,
            code: 401,
            message: 'Unauthorized',
            data: null,
          });
        });
    });

    it('should return 401 if an invalid bearer token is provided', () => {
      return request(app.getHttpServer())
        .get('/apartments')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual({
            success: false,
            code: 401,
            message: 'Unauthorized',
            data: null,
          });
        });
    });

    it('should return 200 and a list of apartments if correct bearer token is provided', async () => {
      const res = await request(app.getHttpServer())
        .get('/apartments')
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.code).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);

      if (res.body.data.length > 0) {
        firstApartmentId = res.body.data[0].id; // store first apartment id for later
      }
    });
  });

  describe('GET /apartments/:id', () => {
    it('should return 404 for a non-existing UUID', () => {
      return request(app.getHttpServer())
        .get('/apartments/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee')
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .expect(404)
        .expect((res) => {
          expect(res.body).toEqual({
            success: false,
            code: 404,
            message: 'Apartment not found',
            data: null,
          });
        });
    });

    it('should return 400 for a malformed ID', () => {
      return request(app.getHttpServer())
        .get('/apartments/abcd')
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .expect(400)
        .expect((res) => {
          expect(res.body).toEqual({
            success: false,
            code: 400,
            message: 'Validation failed (uuid is expected)',
            data: null,
          });
        });
    });

    it('should return 200 for a valid apartment ID', function () {
      if (!firstApartmentId) {
        this.skip(); // skip test if no apartments exist
      }

      return request(app.getHttpServer())
        .get(`/apartments/${firstApartmentId}`)
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.code).toBe(200);
          expect(res.body.data).toHaveProperty('id', firstApartmentId);
        });
    });
  });
  describe('POST /apartments', () => {
    it('should create apartment with all fields and return 200', async () => {
      const res = await request(app.getHttpServer())
        .post('/apartments')
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .send({
          name: 'Test 1',
          max_guests: 4,
          bedrooms: 2,
          bathrooms: 2,
          beds: 2,
          description: 'Test 1.',
          longitude: 31.2357,
          latitude: 30.0444,
          price: 250.75,
          images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
          ],
          city: 'Cairo',
          country: 'Egypt',
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.code).toBe(200);
      expect(res.body.data).toHaveProperty('id');
      expect(isUUID(res.body.data.id)).toBe(true);
    });

    it('should create apartment with required fields only and return 200', async () => {
      const res = await request(app.getHttpServer())
        .post('/apartments')
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .send({
          name: 'Test 2',
          max_guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          beds: 1,
          longitude: 31.2357,
          latitude: 30.0444,
          price: 100.0,
          city: 'Cairo',
          country: 'Egypt',
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.code).toBe(200);
      expect(res.body.data).toHaveProperty('id');
      expect(isUUID(res.body.data.id)).toBe(true);
    });

    it('should return 400 for invalid apartment data', async () => {
      const res = await request(app.getHttpServer())
        .post('/apartments')
        .set('Authorization', `Bearer ${process.env.SECRET}`)
        .send({
          name: 'A',
          max_guests: 0,
          bedrooms: -1,
          bathrooms: -2,
          beds: -1,
          description: 123,
          longitude: 200,
          latitude: -200,
          price: -10,
          images: ['', '   ', null],
          city: 'InvalidCity',
          country: 'Mars',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe(400);
      expect(res.body.message).toBe('Bad Request');
      expect(res.body.data).toBeNull();
      expect(res.body.errors).toEqual({
        name: 'name must be at least 2 characters',
        max_guests: 'max_guests must be greater than 0',
        bedrooms: 'bedrooms must be 0 or more',
        bathrooms: 'bathrooms must be 0 or more',
        beds: 'beds must be 0 or more',
        longitude: 'longitude must be <= 180',
        latitude: 'latitude must be >= -90',
        price: 'price must be greater than 0',
        images: 'images must be an array of non-empty strings',
        city: expect.any(String),
        country: expect.any(String),
      });
    });
  });
});
