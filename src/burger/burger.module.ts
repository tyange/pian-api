import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { BurgerController } from './burger.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Burger]), AuthModule],
  providers: [],
  controllers: [BurgerController],
})
export class BurgerModule {}
