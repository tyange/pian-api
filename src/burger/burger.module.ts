import { Module } from '@nestjs/common';
import { BurgerController } from './burger.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [BurgerController],
})
export class BurgerModule {}
