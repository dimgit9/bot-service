export class TheatreEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly address: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}
