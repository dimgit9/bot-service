export class HallEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly theatreId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}
