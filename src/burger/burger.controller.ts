import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { Repository } from 'typeorm';
import { AddBurgerDto } from './dto/add-burger.dto';

@Controller('burgers')
export class BurgerController {
  constructor(
    @InjectRepository(Burger)
    private burgerRepository: Repository<Burger>,
  ) {}

  @Post()
  addBurger(@Body() addBurgerDto: AddBurgerDto): Promise<Burger> {
    const burger = this.burgerRepository.create({
      name: addBurgerDto.name,
      brand: addBurgerDto.brand,
      description: addBurgerDto.description,
    });

    return this.burgerRepository.save(burger);
  }
}
