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
import { BurgerService } from './burger.service';

@Controller('burger')
export class BurgerController {
  constructor(
    @InjectRepository(Burger)
    private burgerRepository: Repository<Burger>,
    private burgerService: BurgerService,
  ) {}

  @Get()
  getAllBurger(): Promise<Burger[]> {
    return this.burgerService.getAllBurger();
  }

  @Get(':userId')
  getAllBurgerWithUserId(@Param('userId') userId: number): Promise<Burger[]> {
    return this.burgerService.getAllBurgerWithUserId(userId);
  }

  @Get(':id')
  getBurger(@Param('id') burgerId: number): Promise<Burger> {
    return this.burgerService.getBurger(burgerId);
  }

  @Post()
  @UseGuards(AuthGuard())
  addBurger(
    @Body() addBurgerDto: AddBurgerDto,
    @GetUser() user: User,
  ): Promise<Burger> {
    return this.burgerService.addBurger(addBurgerDto, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  editBurger(
    @Param('id') editBurgerId: number,
    @GetUser() user: User,
    @Body() editBurgerDto: EditBurgerDto,
  ): Promise<Burger> {
    return this.burgerService.editBurger(editBurgerId, user, editBurgerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteBurger(
    @Param('id') deleteBurgerId: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.burgerService.deleteBurger(deleteBurgerId, user);
  }
}
