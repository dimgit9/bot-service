import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TheatreModule } from './modules/theatre/infrastructure/theatre.module';
import { HallModule } from './modules/hall/infrastructure/hall.module';
import { SeatModule } from './modules/seat/infrastructure/seat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env',
      ],
      isGlobal: true,
    }),
    TheatreModule,
    HallModule,
    SeatModule,
  ],
})
export class AppModule {}
