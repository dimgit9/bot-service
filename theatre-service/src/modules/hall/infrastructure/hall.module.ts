import { Module } from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';

import { HallRepositoryPort } from '../domain/ports/hall.repository.port';
import { TransactionPort } from '../domain/ports/transaction.port';
import { ListHallsUsecase } from '../application/queries/list-halls.usecase';
import { GetHallUsecase } from '../application/queries/get-hall.usecase';
import { CreateHallUsecase } from '../application/commands/create-hall.usecase';
import { HallGrpcController } from '../interfaces/grpc/hall.grpc.controller';

import { HallPrismaRepository } from './prisma/hall.prisma.repository';
import { PrismaTransactionContext } from './prisma/transaction-context.prisma';
import { PrismaTransactionManager } from './prisma/transaction-manager.prisma';

@Module({
  controllers: [HallGrpcController],
  providers: [
    PrismaService,
    ListHallsUsecase,
    GetHallUsecase,
    CreateHallUsecase,
    PrismaTransactionContext,
    {
      provide: HallRepositoryPort,
      useClass: HallPrismaRepository,
    },
    {
      provide: TransactionPort,
      useClass: PrismaTransactionManager,
    },
  ],
})
export class HallModule {}
