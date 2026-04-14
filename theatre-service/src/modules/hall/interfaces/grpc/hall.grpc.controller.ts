import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import type {
  CreateHallRequest,
  CreateHallResponse,
  GetHallRequest,
  GetHallResponse,
  ListHallsRequest,
  ListHallsResponse,
} from '@dimgit9/contracts/gen/ts/hall';

import { ListHallsUsecase } from '../../application/queries/list-halls.usecase';
import { GetHallUsecase } from '../../application/queries/get-hall.usecase';
import { CreateHallUsecase } from '../../application/commands/create-hall.usecase';

@Controller()
export class HallGrpcController {
  constructor(
    private readonly createUC: CreateHallUsecase,
    private readonly listUC: ListHallsUsecase,
    private readonly getUC: GetHallUsecase,
  ) {}

  @GrpcMethod('HallService', 'CreateHall')
  async create(data: CreateHallRequest): Promise<CreateHallResponse> {
    const hall = await this.createUC.execute(data);

    return {
      hall,
    };
  }

  @GrpcMethod('HallService', 'GetHall')
  async getById(data: GetHallRequest): Promise<GetHallResponse> {
    const hall = await this.getUC.execute(data.id);

    return {
      hall,
    };
  }

  @GrpcMethod('HallService', 'ListHallsByTheatre')
  async getAll(data: ListHallsRequest): Promise<ListHallsResponse> {
    const halls = await this.listUC.execute(data.theatreId);

    return {
      halls,
    };
  }
}
