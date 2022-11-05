import { Module } from '@nestjs/common';
import { BurgersController } from './burgers.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [BurgersController],
})
export class BurgersModule {}
