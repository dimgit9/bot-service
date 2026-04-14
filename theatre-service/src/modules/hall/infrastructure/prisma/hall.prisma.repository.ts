import { Injectable } from '@nestjs/common';
import { SeatCreateManyInput } from '@prisma/generated/models';

import { PrismaService } from '@/infra/prisma/prisma.service';

import {
  HallRepositoryPort,
  RowLayout,
} from '../../domain/ports/hall.repository.port';
import { HallEntity } from '../../domain/entities/hall.entity';
import {
  PrismaClientLike,
  PrismaTransactionContext,
} from './transaction-context.prisma';

@Injectable()
export class HallPrismaRepository implements HallRepositoryPort {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly txContext: PrismaTransactionContext,
  ) {}

  private get client(): PrismaClientLike {
    return this.txContext.getClient(this.prismaService);
  }

  async create(data: {
    name: string;
    theatreId: string;
    layout: RowLayout[];
  }): Promise<HallEntity> {
    const hall = await this.client.hall.create({
      data: {
        name: data.name,
        theatre: {
          connect: {
            id: data.theatreId,
          },
        },
      },
    });

    return new HallEntity(
      hall.id,
      hall.name,
      hall.theatreId,
      hall.createdAt,
      hall.updatedAt,
    );
  }

  async findById(id: string): Promise<HallEntity | null> {
    const hall = await this.prismaService.hall.findUnique({
      where: {
        id,
      },
    });

    if (!hall) return null;

    return new HallEntity(
      hall.id,
      hall.name,
      hall.theatreId,
      hall.createdAt,
      hall.updatedAt,
    );
  }

  async listByTheatre(theatreId: string): Promise<HallEntity[]> {
    const items = await this.prismaService.hall.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        theatreId,
      },
    });

    return items.map(
      (hall) =>
        new HallEntity(
          hall.id,
          hall.name,
          hall.theatreId,
          hall.createdAt,
          hall.updatedAt,
        ),
    );
  }

  async createSeats(data: {
    hallId: string;
    layout: RowLayout[];
  }): Promise<void> {
    const seats: SeatCreateManyInput[] = [];

    for (const rowConfig of data.layout) {
      for (let num = 1; num <= rowConfig.columns; num++) {
        seats.push({
          row: rowConfig.row,
          number: num,
          hallId: data.hallId,
          type: rowConfig.type,
          price: rowConfig.price,
          x: num,
          y: rowConfig.row,
        });
      }
    }

    await this.client.seat.createMany({
      data: seats,
    });
  }
}
