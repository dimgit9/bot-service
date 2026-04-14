import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import type {
  GetSeatRequest,
  GetSeatResponse,
  ListSeatsRequest,
  ListSeatsResponse,
} from '@dimgit9/contracts/gen/ts/seat';

import { ListSeatsUsecase } from '../../application/queries/list-seats.usecase';
import { GetSeatUsecase } from '../../application/queries/get-seat.usecase';

@Controller()
export class SeatGrpcController {
  constructor(
    private readonly listUC: ListSeatsUsecase,
    private readonly getUC: GetSeatUsecase,
  ) {}

  @GrpcMethod('SeatService', 'GetSeat')
  async getById(data: GetSeatRequest): Promise<GetSeatResponse> {
    const seat = await this.getUC.execute(data.id);

    return {
      seat: {
        ...seat,
        status: 'available',
      },
    };
  }

  @GrpcMethod('SeatService', 'ListSeats')
  async list(data: ListSeatsRequest): Promise<ListSeatsResponse> {
    const seats = await this.listUC.execute(data.hallId, data.seanceId);

    return {
      seats,
    };
  }
}
