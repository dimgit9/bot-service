import { Injectable } from '@nestjs/common';

import { SeatRepositoryPort } from '../../domain/ports/seat.repository.port';
import { BookingPort } from '../../domain/ports/booking.port';

@Injectable()
export class ListSeatsUsecase {
  constructor(
    private readonly repository: SeatRepositoryPort,
    private readonly booking: BookingPort,
  ) {}

  async execute(hallId: string, seanceId: string) {
    const seats = await this.repository.findSeatsByHall(hallId);

    const reserved = await this.booking.listReservedSeats(hallId, seanceId);

    return seats.map((seat) => ({
      ...seat,
      status: reserved.includes(seat.id) ? 'reserved' : 'available',
    }));
  }
}
