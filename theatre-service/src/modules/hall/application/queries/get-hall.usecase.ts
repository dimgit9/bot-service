import { Injectable } from '@nestjs/common';
import { HallRepositoryPort } from '../../domain/ports/hall.repository.port';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@dimgit9/common';

@Injectable()
export class GetHallUsecase {
  constructor(private readonly repository: HallRepositoryPort) {}

  async execute(id: string) {
    const hall = await this.repository.findById(id);

    if (!hall)
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        details: 'Hall not found',
      });

    return hall;
  }
}
