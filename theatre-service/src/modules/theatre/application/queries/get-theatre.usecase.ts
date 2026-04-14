import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@dimgit9/common';

import { TheatreRepositoryPort } from '../../domain/ports/theatre.repository.port';

@Injectable()
export class GetTheatreUsecase {
  constructor(private readonly repository: TheatreRepositoryPort) {}

  async execute(id: string) {
    const theatre = await this.repository.findById(id);

    if (!theatre)
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        details: 'Theatre not found',
      });

    return theatre;
  }
}
