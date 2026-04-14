import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { TheatreEntity } from '../../domain/entities/theatre.entity';
import { TheatreRepositoryPort } from '../../domain/ports/theatre.repository.port';

@Injectable()
export class TheatrePrismaRepository implements TheatreRepositoryPort {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<TheatreEntity[]> {
    const items = await this.prismaService.theatre.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return items.map(
      (t) =>
        new TheatreEntity(t.id, t.name, t.address, t.createdAt, t.updatedAt),
    );
  }

  async findById(id: string): Promise<TheatreEntity | null> {
    const item = await this.prismaService.theatre.findFirst({
      where: {
        id,
      },
    });

    if (!item) return null;

    return new TheatreEntity(
      item.id,
      item.name,
      item.address,
      item.createdAt,
      item.updatedAt,
    );
  }

  async create(data: {
    name: string;
    address: string;
  }): Promise<TheatreEntity> {
    const item = await this.prismaService.theatre.create({
      data,
    });

    return new TheatreEntity(
      item.id,
      item.name,
      item.address,
      item.createdAt,
      item.updatedAt,
    );
  }
}
