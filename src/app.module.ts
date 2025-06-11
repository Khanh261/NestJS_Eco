import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import * as Joi from '@hapi/joi';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    BackendModule,
    FrontendModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
