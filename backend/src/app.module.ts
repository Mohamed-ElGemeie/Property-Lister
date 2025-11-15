import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentsModule } from './modules/apartments/apartments.module';
import { Apartment } from './modules/apartments/entities/apartment.entity';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'propertylister',
      entities: [Apartment],
      synchronize: false,
      logging: true,
    }),
    ApartmentsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'ping', method: RequestMethod.ALL },
        { path: '/', method: RequestMethod.ALL },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
