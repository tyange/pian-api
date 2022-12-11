import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { BurgerController } from './burger.controller';
import { AuthModule } from '../auth/auth.module';
import { BurgerService } from './burger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Burger]), AuthModule],
  providers: [BurgerService],
  controllers: [BurgerController],
})
export class BurgerModule {}
