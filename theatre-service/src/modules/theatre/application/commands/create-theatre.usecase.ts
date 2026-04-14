import { Injectable } from '@nestjs/common';

import { TheatreRepositoryPort } from '../../domain/ports/theatre.repository.port';

@Injectable()
export class CreateTheatreUsecase {
  constructor(private readonly repository: TheatreRepositoryPort) {}

  execute(input: { name: string; address: string }) {
    return this.repository.create(input);
  }
}
