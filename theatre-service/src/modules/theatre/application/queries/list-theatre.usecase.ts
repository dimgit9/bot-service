import { Injectable } from '@nestjs/common';

import { TheatreRepositoryPort } from '../../domain/ports/theatre.repository.port';

@Injectable()
export class ListTheatresUsecase {
  constructor(private readonly repository: TheatreRepositoryPort) {}

  async execute() {
    return this.repository.findAll();
  }
}
