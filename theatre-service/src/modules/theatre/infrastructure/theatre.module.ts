import { Module } from '@nestjs/common';

import { TheatreRepositoryPort } from '../domain/ports/theatre.repository.port';
import { TheatrePrismaRepository } from './prisma/theatre.prisma.repository';
import { ListTheatresUsecase } from '../application/queries/list-theatre.usecase';
import { GetTheatreUsecase } from '../application/queries/get-theatre.usecase';
import { CreateTheatreUsecase } from '../application/commands/create-theatre.usecase';
import { TheatreGrpcController } from '../interfaces/grpc/theatre.grpc.controller';
import { PrismaService } from '@/infra/prisma/prisma.service';

@Module({
  controllers: [TheatreGrpcController],
  providers: [
    PrismaService,
    {
      provide: TheatreRepositoryPort,
      useClass: TheatrePrismaRepository,
    },
    ListTheatresUsecase,
    GetTheatreUsecase,
    CreateTheatreUsecase,
  ],
})
export class TheatreModule {}
