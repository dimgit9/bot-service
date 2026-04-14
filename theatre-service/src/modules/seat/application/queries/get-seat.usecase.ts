import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@dimgit9/common';

import { SeatRepositoryPort } from '../../domain/ports/seat.repository.port';

@Injectable()
export class GetSeatUsecase {
  constructor(private readonly repository: SeatRepositoryPort) {}

  async execute(id: string) {
    const seat = await this.repository.findById(id);

    if (!seat)
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        details: 'Seat not found',
      });

    return seat;
  }
}
