export abstract class BookingPort {
  abstract listReservedSeats(
    hallId: string,
    seanceId: string,
  ): Promise<string[]>;
}
