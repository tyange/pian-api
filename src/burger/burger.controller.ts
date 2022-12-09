import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { DeleteResult, Repository } from 'typeorm';
import { AddBurgerDto } from './dto/add-burger.dto';
import { EditBurgerDto } from './dto/edit-burger.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

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
  @UseGuards(AuthGuard())
  addBurger(
    @Body() addBurgerDto: AddBurgerDto,
    @GetUser() user: User,
  ): Promise<Burger> {
    const burger = this.burgerRepository.create({
      name: addBurgerDto.name,
      brand: addBurgerDto.brand,
      description: addBurgerDto.description,
      user: user,
    });

    return this.burgerRepository.save(burger);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
  async deleteBurger(
    @Param('id') deleteBurgerId: number,
  ): Promise<DeleteResult> {
    return this.burgerRepository.delete(deleteBurgerId);
  }
}
