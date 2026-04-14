import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/prisma/prisma.service';
import { TransactionPort } from '../../domain/ports/transaction.port';
import { PrismaTransactionContext } from './transaction-context.prisma';

@Injectable()
export class PrismaTransactionManager implements TransactionPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly txContext: PrismaTransactionContext,
  ) {}

  async run<T>(callback: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      this.txContext.setClient(tx);

      try {
        return await callback();
      } finally {
        this.txContext.setClient(null);
      }
    });
  }
}
