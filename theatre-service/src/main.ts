import { NestFactory } from '@nestjs/core';
import { Transport, type MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from '@dimgit9/contracts';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const host = configService.getOrThrow<string>('GRPC_HOST');
  const port = configService.getOrThrow<number>('GRPC_PORT');

  const url = `${host}:${port}`;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: ['theatre.v1', 'hall.v1', 'seat.v1'],
      protoPath: [PROTO_PATHS.THEATRE, PROTO_PATHS.HALL, PROTO_PATHS.SEAT],
      url,
      loader: {
        keepCase: false,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
    },
  });

  app.startAllMicroservices();
  app.init();
}
bootstrap();
