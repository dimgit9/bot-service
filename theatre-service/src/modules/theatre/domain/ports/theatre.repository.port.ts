import { TheatreEntity } from '../entities/theatre.entity';

export abstract class TheatreRepositoryPort {
  abstract findAll(): Promise<TheatreEntity[]>;
  abstract findById(id: string): Promise<TheatreEntity | null>;
  abstract create(data: {
    name: string;
    address: string;
  }): Promise<TheatreEntity>;
}
