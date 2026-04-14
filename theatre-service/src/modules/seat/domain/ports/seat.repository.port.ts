import { SeatEntity } from '../entities/seat.entity';

export abstract class SeatRepositoryPort {
  abstract findById(id: string): Promise<SeatEntity | null>;
  abstract findSeatsByHall(hallId: string): Promise<SeatEntity[]>;
}
