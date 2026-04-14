import { HallEntity } from '../entities/hall.entity';

export interface RowLayout {
  row: number;
  columns: number;
  type: string;
  price: number;
}

export abstract class HallRepositoryPort {
  abstract create(data: {
    name: string;
    theatreId: string;
    layout: RowLayout[];
  }): Promise<HallEntity>;

  abstract findById(id: string): Promise<HallEntity | null>;
  abstract listByTheatre(theatreId: string): Promise<HallEntity[]>;
  abstract createSeats(data: {
    hallId: string;
    layout: RowLayout[];
  }): Promise<void>;
}
