export class SeatEntity {
  constructor(
    readonly id: string,
    readonly row: number,
    readonly number: number,
    readonly price: number,
    readonly type: string,
    readonly hallId: string,
    readonly status?: 'reserved' | 'available',
  ) {}
}
