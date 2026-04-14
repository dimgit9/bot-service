import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import type {
  CreateTheatreRequest,
  CreateTheatreResponse,
  GetTheatreRequest,
  GetTheatreResponse,
  ListTheatresResponse,
} from '@dimgit9/contracts/gen/ts/theatre';

import { ListTheatresUsecase } from '../../application/queries/list-theatre.usecase';
import { GetTheatreUsecase } from '../../application/queries/get-theatre.usecase';
import { CreateTheatreUsecase } from '../../application/commands/create-theatre.usecase';

@Controller()
export class TheatreGrpcController {
  constructor(
    private readonly listUC: ListTheatresUsecase,
    private readonly getUC: GetTheatreUsecase,
    private readonly createUC: CreateTheatreUsecase,
  ) {}

  @GrpcMethod('TheatreService', 'ListTheatres')
  async getAll(): Promise<ListTheatresResponse> {
    const theatres = await this.listUC.execute();

    return {
      theatres,
    };
  }

  @GrpcMethod('TheatreService', 'GetTheatre')
  async getById(data: GetTheatreRequest): Promise<GetTheatreResponse> {
    const theatre = await this.getUC.execute(data.id);

    return {
      theatre,
    };
  }

  @GrpcMethod('TheatreService', 'CreateTheatre')
  async create(data: CreateTheatreRequest): Promise<CreateTheatreResponse> {
    const theatre = await this.createUC.execute(data);

    return {
      theatre,
    };
  }
}
