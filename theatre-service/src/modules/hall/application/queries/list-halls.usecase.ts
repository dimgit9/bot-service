import { Injectable } from '@nestjs/common';
import { HallRepositoryPort } from '../../domain/ports/hall.repository.port';

@Injectable()
export class ListHallsUsecase {
  constructor(private readonly repository: HallRepositoryPort) {}

  async execute(theatreId: string) {
    return await this.repository.listByTheatre(theatreId);
  }
}
