import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { SeatEntity } from '../../domain/entities/seat.entity';
import { SeatRepositoryPort } from '../../domain/ports/seat.repository.port';

@Injectable()
export class SeatPrismaRepository implements SeatRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string): Promise<SeatEntity | null> {
    const seat = await this.prismaService.seat.findUnique({
      where: {
        id,
      },
    });

    if (!seat) return null;

    return new SeatEntity(
      seat.id,
      seat.row,
      seat.number,
      seat.price,
      seat.type,
      seat.hallId,
    );
  }

  async findSeatsByHall(hallId: string): Promise<SeatEntity[]> {
    const items = await this.prismaService.seat.findMany({
      where: {
        hallId,
      },
      orderBy: [
        {
          row: 'asc',
        },
        {
          number: 'asc',
        },
      ],
    });

    return items.map(
      (seat) =>
        new SeatEntity(
          seat.id,
          seat.row,
          seat.number,
          seat.price,
          seat.type,
          seat.hallId,
        ),
    );
  }
}
