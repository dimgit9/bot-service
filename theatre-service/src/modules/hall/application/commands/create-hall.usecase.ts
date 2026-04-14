import { Injectable } from '@nestjs/common';

import {
  HallRepositoryPort,
  RowLayout,
} from '../../domain/ports/hall.repository.port';
import { TransactionPort } from '../../domain/ports/transaction.port';

@Injectable()
export class CreateHallUsecase {
  constructor(
    private readonly repository: HallRepositoryPort,
    private readonly transaction: TransactionPort,
  ) {}

  async execute(input: {
    name: string;
    theatreId: string;
    layout: RowLayout[];
  }) {
    return this.transaction.run(async () => {
      const hall = await this.repository.create(input);

      await this.repository.createSeats({
        hallId: hall.id,
        layout: input.layout,
      });

      return hall;
    });
  }
}
