import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Burger } from './burger.entity';
import { Repository } from 'typeorm';
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
    // TODO: admin 유저의 경우 모든 버거를 볼 수 있도록 처리.
    return this.burgerRepository.find();
  }

  @Get(':userId')
  @UseGuards(AuthGuard())
  async getAllBurgerWithUserId(
    @Param('userId') userId: string,
    @GetUser() user: User,
  ): Promise<Burger[]> {
    if (parseInt(userId) !== user.id) {
      throw new UnauthorizedException();
    }

    const query = this.burgerRepository.createQueryBuilder('burger');

    query.where('burger.userId = :userId', { userId: user.id });

    return await query.getMany();
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
    @GetUser() user: User,
    @Body() editBurgerDto: EditBurgerDto,
  ): Promise<Burger> {
    const targetBurger = await this.burgerRepository.findOne({
      where: {
        id: editBurgerId,
        user,
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
    @GetUser() user: User,
  ): Promise<void> {
    const result = await this.burgerRepository.delete({
      id: deleteBurgerId,
      user,
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Can't find Burger with id ${deleteBurgerId}`,
      );
    }
  }
}
