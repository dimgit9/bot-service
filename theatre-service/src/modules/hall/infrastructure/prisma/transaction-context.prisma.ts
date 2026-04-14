import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/generated/client';

import { PrismaService } from '@/infra/prisma/prisma.service';

export type PrismaClientLike = PrismaService | Prisma.TransactionClient;

@Injectable()
export class PrismaTransactionContext {
  private client: PrismaClientLike | null = null;

  getClient(prisma: PrismaService): PrismaClientLike {
    return this.client ?? prisma;
  }

  setClient(client: Prisma.TransactionClient | null) {
    this.client = client;
  }
}
