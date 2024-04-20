import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO
  // CONFIGURAR EL ARCHIVO ENV
  // const configService = app.get(ConfigService);
  // await app.listen(configService.get('PORT'));
  await app.listen(3000);
}
bootstrap();
