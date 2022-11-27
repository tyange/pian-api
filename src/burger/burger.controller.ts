import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AddBurgerDto } from './dto/add-burger.dto';
import { EditBurgerDto } from './dto/edit-burger.dto';

@Controller('burger')
export class BurgerController {
  constructor(
    @InjectRepository(Burger)
    private burgerRepository: Repository<Burger>,
  ) {}

  @Get()
  getAllBurger() {
    return this.burgerRepository.find();
  }

  @Get(':id')
  getBurger(@Param('id') burgerId: number) {
    return this.burgerRepository.findOne({
      where: {
        id: burgerId,
      },
    });
  }

  @Post()
  addBurger(@Body() addBurgerDto: AddBurgerDto): Promise<Burger> {
    const burger = this.burgerRepository.create({
      name: addBurgerDto.name,
      brand: addBurgerDto.brand,
      description: addBurgerDto.description,
    });

    return this.burgerRepository.save(burger);
  }

  @Put(':id')
  async editBurger(
    @Param('id') editBurgerId: number,
    @Body() editBurgerDto: EditBurgerDto,
  ): Promise<Burger> {
    const targetBurger = await this.burgerRepository.findOne({
      where: {
        id: editBurgerId,
      },
    });

    targetBurger.name = editBurgerDto.name;
    targetBurger.brand = editBurgerDto.brand;
    targetBurger.description = editBurgerDto.description;

    return this.burgerRepository.save(targetBurger);
  }

  @Delete(':id')
  async deleteBurger(
    @Param('id') deleteBurgerId: number,
  ): Promise<DeleteResult> {
    return this.burgerRepository.delete(deleteBurgerId);
  }
}
