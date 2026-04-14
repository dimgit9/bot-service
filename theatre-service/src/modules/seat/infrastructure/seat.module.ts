import { Module } from '@nestjs/common';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { SeatRepositoryPort } from '../domain/ports/seat.repository.port';
import { ListSeatsUsecase } from '../application/queries/list-seats.usecase';
import { GetSeatUsecase } from '../application/queries/get-seat.usecase';
import { SeatGrpcController } from '../interfaces/grpc/seat.grpc.controller';
import { SeatPrismaRepository } from './prisma/seat.prisma.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PROTO_PATHS } from '@dimgit9/contracts';
import { BookingPort } from '../domain/ports/booking.port';
import { BookingGrpcAdapter } from './grpc/booking.grpc.adapter';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'BOOKING_PACKAGE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'booking.v1',
            protoPath: PROTO_PATHS.BOOKING,
            url: configService.getOrThrow<string>('BOOKING_GRPC_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [SeatGrpcController],
  providers: [
    PrismaService,
    {
      provide: SeatRepositoryPort,
      useClass: SeatPrismaRepository,
    },
    {
      provide: BookingPort,
      useClass: BookingGrpcAdapter,
    },
    ListSeatsUsecase,
    GetSeatUsecase,
  ],
})
export class SeatModule {}
