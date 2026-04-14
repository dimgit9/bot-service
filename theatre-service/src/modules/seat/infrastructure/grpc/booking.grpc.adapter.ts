import { Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import type { BookingServiceClient } from '@dimgit9/contracts/gen/ts/booking';

import { BookingPort } from '../../domain/ports/booking.port';

export class BookingGrpcAdapter implements BookingPort, OnModuleInit {
  private service!: BookingServiceClient;

  constructor(
    @Inject('BOOKING_PACKAGE')
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service =
      this.client.getService<BookingServiceClient>('BookingService');
  }

  async listReservedSeats(hallId: string, seanceId: string): Promise<string[]> {
    const res = await lastValueFrom(
      this.service.listReservedSeats({ hallId, seanceId }),
    );

    return res?.reservedSeatIds ?? [];
  }
}
