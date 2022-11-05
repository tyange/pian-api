import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { BurgerController } from './burger.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Burger])],
  providers: [],
  controllers: [BurgerController],
})
export class BurgerModule {}
