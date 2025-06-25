'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const swagger_1 = require('@nestjs/swagger');
const config_1 = require('@nestjs/config');
const common_1 = require('@nestjs/common');
const exceptionsLogger_filter_1 = require('./utils/exceptionsLogger.filter');
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  const configService = app.get(config_1.ConfigService);
  const config = new swagger_1.DocumentBuilder()
    .setTitle('Adaps example')
    .setDescription('The Adaps API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new common_1.ValidationPipe());
  const documentFactory = () =>
    swagger_1.SwaggerModule.createDocument(app, config);
  swagger_1.SwaggerModule.setup('api', app, documentFactory);
  const { httpAdapter } = app.get(core_1.HttpAdapterHost);
  app.useGlobalFilters(
    new exceptionsLogger_filter_1.ExceptionsLoggerFilter(httpAdapter),
  );
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
